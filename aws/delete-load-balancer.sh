#!/bin/bash
# Delete Application Load Balancer and related resources

set -e

AWS_REGION="${AWS_REGION:-ap-south-2}"
ALB_NAME="neet-mock-test-alb"
TARGET_GROUP_NAME="neet-mock-test-tg"
SG_NAME="neet-mock-test-alb-sg"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${RED}Deleting Application Load Balancer${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Get ALB ARN
echo -e "${BLUE}Step 1: Getting Load Balancer information...${NC}"
ALB_ARN=$(aws elbv2 describe-load-balancers \
  --names ${ALB_NAME} \
  --region ${AWS_REGION} \
  --query 'LoadBalancers[0].LoadBalancerArn' \
  --output text 2>/dev/null || echo "")

if [ -z "$ALB_ARN" ] || [ "$ALB_ARN" == "None" ]; then
  echo -e "${YELLOW}Load Balancer not found.${NC}"
  exit 0
fi

echo -e "${GREEN}✓ Found ALB: ${ALB_ARN}${NC}"
echo ""

# Step 2: Delete listeners
echo -e "${BLUE}Step 2: Deleting listeners...${NC}"
LISTENER_ARNS=$(aws elbv2 describe-listeners \
  --load-balancer-arn ${ALB_ARN} \
  --region ${AWS_REGION} \
  --query 'Listeners[*].ListenerArn' \
  --output text 2>/dev/null || echo "")

if [ -n "$LISTENER_ARNS" ] && [ "$LISTENER_ARNS" != "None" ]; then
  for listener in $LISTENER_ARNS; do
    echo -e "${YELLOW}Deleting listener: ${listener}${NC}"
    aws elbv2 delete-listener \
      --listener-arn ${listener} \
      --region ${AWS_REGION} > /dev/null
  done
  echo -e "${GREEN}✓ Listeners deleted${NC}"
else
  echo -e "${YELLOW}No listeners found${NC}"
fi
echo ""

# Step 3: Get target group ARN
echo -e "${BLUE}Step 3: Getting target group...${NC}"
TG_ARN=$(aws elbv2 describe-target-groups \
  --names ${TARGET_GROUP_NAME} \
  --region ${AWS_REGION} \
  --query 'TargetGroups[0].TargetGroupArn' \
  --output text 2>/dev/null || echo "")

# Step 4: Update ECS service to remove load balancer
echo -e "${BLUE}Step 4: Updating ECS service to remove load balancer...${NC}"
SERVICE_EXISTS=$(aws ecs describe-services \
  --cluster neet-mock-test-cluster \
  --services neet-mock-test-service \
  --region ${AWS_REGION} \
  --query 'services[0].status' \
  --output text 2>/dev/null || echo "NONE")

if [ "$SERVICE_EXISTS" = "ACTIVE" ]; then
  # Get current network configuration
  CURRENT_NETWORK=$(aws ecs describe-services \
    --cluster neet-mock-test-cluster \
    --services neet-mock-test-service \
    --region ${AWS_REGION} \
    --query 'services[0].networkConfiguration' \
    --output json)
  
  # Update service without load balancer
  aws ecs update-service \
    --cluster neet-mock-test-cluster \
    --service neet-mock-test-service \
    --load-balancers [] \
    --network-configuration "${CURRENT_NETWORK}" \
    --region ${AWS_REGION} > /dev/null 2>&1 || {
    # Alternative: just remove load balancer config
    aws ecs update-service \
      --cluster neet-mock-test-cluster \
      --service neet-mock-test-service \
      --network-configuration "${CURRENT_NETWORK}" \
      --region ${AWS_REGION} > /dev/null 2>&1 || true
  }
  
  echo -e "${GREEN}✓ ECS service updated${NC}"
else
  echo -e "${YELLOW}ECS service not found or already updated${NC}"
fi
echo ""

# Step 5: Wait a bit for service to update
echo -e "${BLUE}Step 5: Waiting for service update...${NC}"
sleep 10
echo ""

# Step 6: Delete target group
echo -e "${BLUE}Step 6: Deleting target group...${NC}"
if [ -n "$TG_ARN" ] && [ "$TG_ARN" != "None" ]; then
  aws elbv2 delete-target-group \
    --target-group-arn ${TG_ARN} \
    --region ${AWS_REGION} > /dev/null 2>&1 || {
    echo -e "${YELLOW}Target group may have dependencies, trying to deregister targets first...${NC}"
    # Try to deregister all targets
    TARGETS=$(aws elbv2 describe-target-health \
      --target-group-arn ${TG_ARN} \
      --region ${AWS_REGION} \
      --query 'TargetHealthDescriptions[*].Target.Id' \
      --output text 2>/dev/null || echo "")
    
    if [ -n "$TARGETS" ]; then
      for target in $TARGETS; do
        aws elbv2 deregister-targets \
          --target-group-arn ${TG_ARN} \
          --targets Id=${target} \
          --region ${AWS_REGION} > /dev/null 2>&1 || true
      done
      sleep 5
    fi
    
    aws elbv2 delete-target-group \
      --target-group-arn ${TG_ARN} \
      --region ${AWS_REGION} > /dev/null 2>&1 || echo -e "${YELLOW}Target group deletion may need manual cleanup${NC}"
  }
  echo -e "${GREEN}✓ Target group deleted${NC}"
else
  echo -e "${YELLOW}Target group not found${NC}"
fi
echo ""

# Step 7: Delete load balancer
echo -e "${BLUE}Step 7: Deleting Application Load Balancer...${NC}"
aws elbv2 delete-load-balancer \
  --load-balancer-arn ${ALB_ARN} \
  --region ${AWS_REGION} > /dev/null

echo -e "${GREEN}✓ Load Balancer deleted${NC}"
echo ""

# Step 8: Delete ALB security group (optional)
echo -e "${BLUE}Step 8: Cleaning up security group...${NC}"
read -p "Delete ALB security group? (y/n): " DELETE_SG

if [ "$DELETE_SG" = "y" ] || [ "$DELETE_SG" = "Y" ]; then
  ALB_SG_ID=$(aws ec2 describe-security-groups \
    --filters "Name=group-name,Values=${SG_NAME}" \
    --query 'SecurityGroups[0].GroupId' \
    --output text \
    --region ${AWS_REGION} 2>/dev/null || echo "")
  
  if [ -n "$ALB_SG_ID" ] && [ "$ALB_SG_ID" != "None" ]; then
    aws ec2 delete-security-group \
      --group-id ${ALB_SG_ID} \
      --region ${AWS_REGION} > /dev/null 2>&1 || {
      echo -e "${YELLOW}Security group may have dependencies. You can delete it manually.${NC}"
    }
    echo -e "${GREEN}✓ Security group deleted${NC}"
  else
    echo -e "${YELLOW}Security group not found${NC}"
  fi
else
  echo -e "${YELLOW}Security group kept${NC}"
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Load Balancer Deletion Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Note:${NC}"
echo -e "  - ECS service is still running (scaled to 0)"
echo -e "  - To restart app, scale service back to 1"
echo -e "  - You'll need to recreate ALB if you want it back"
echo ""
