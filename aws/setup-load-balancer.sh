#!/bin/bash
# Setup Application Load Balancer for NEET Mock Test

set -e

AWS_REGION="${AWS_REGION:-ap-south-2}"
AWS_ACCOUNT_ID="868522398039"
ECS_CLUSTER_NAME="neet-mock-test-cluster"
ECS_SERVICE_NAME="neet-mock-test-service"
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
echo -e "${GREEN}Setting up Application Load Balancer${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Get VPC and Subnets
echo -e "${BLUE}Step 1: Getting network configuration...${NC}"
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text --region ${AWS_REGION})
SUBNET_IDS=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=${VPC_ID}" --query 'Subnets[*].SubnetId' --output text --region ${AWS_REGION} | tr '\t' ',')

if [ -z "$VPC_ID" ] || [ "$VPC_ID" == "None" ]; then
    echo -e "${RED}No default VPC found. Please specify VPC ID.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ VPC: ${VPC_ID}${NC}"
echo -e "${GREEN}✓ Subnets: ${SUBNET_IDS}${NC}"
echo ""

# Step 2: Create Security Group for ALB
echo -e "${BLUE}Step 2: Creating security group for ALB...${NC}"
ALB_SG_ID=$(aws ec2 describe-security-groups \
  --filters "Name=group-name,Values=${SG_NAME}" \
  --query 'SecurityGroups[0].GroupId' \
  --output text \
  --region ${AWS_REGION} 2>/dev/null || echo "")

if [ -z "$ALB_SG_ID" ] || [ "$ALB_SG_ID" == "None" ]; then
  ALB_SG_ID=$(aws ec2 create-security-group \
    --group-name ${SG_NAME} \
    --description "Security group for NEET Mock Test ALB" \
    --vpc-id ${VPC_ID} \
    --region ${AWS_REGION} \
    --query 'GroupId' \
    --output text)
  
  # Allow HTTP traffic
  aws ec2 authorize-security-group-ingress \
    --group-id ${ALB_SG_ID} \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 \
    --region ${AWS_REGION} > /dev/null 2>&1 || true
  
  # Allow HTTPS traffic
  aws ec2 authorize-security-group-ingress \
    --group-id ${ALB_SG_ID} \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0 \
    --region ${AWS_REGION} > /dev/null 2>&1 || true
  
  echo -e "${GREEN}✓ ALB Security Group created: ${ALB_SG_ID}${NC}"
else
  echo -e "${GREEN}✓ ALB Security Group exists: ${ALB_SG_ID}${NC}"
fi
echo ""

# Step 3: Update ECS Security Group to allow ALB traffic
echo -e "${BLUE}Step 3: Updating ECS security group...${NC}"
ECS_SG_ID=$(aws ec2 describe-security-groups \
  --filters "Name=group-name,Values=neet-mock-test-sg" \
  --query 'SecurityGroups[0].GroupId' \
  --output text \
  --region ${AWS_REGION})

# Allow traffic from ALB to ECS tasks
aws ec2 authorize-security-group-ingress \
  --group-id ${ECS_SG_ID} \
  --protocol tcp \
  --port 8040 \
  --source-group ${ALB_SG_ID} \
  --region ${AWS_REGION} > /dev/null 2>&1 || echo -e "${YELLOW}Rule may already exist${NC}"

echo -e "${GREEN}✓ ECS Security Group updated${NC}"
echo ""

# Step 4: Create Target Group
echo -e "${BLUE}Step 4: Creating target group...${NC}"
TG_ARN=$(aws elbv2 describe-target-groups \
  --names ${TARGET_GROUP_NAME} \
  --region ${AWS_REGION} \
  --query 'TargetGroups[0].TargetGroupArn' \
  --output text 2>/dev/null || echo "")

if [ -z "$TG_ARN" ] || [ "$TG_ARN" == "None" ]; then
  TG_ARN=$(aws elbv2 create-target-group \
    --name ${TARGET_GROUP_NAME} \
    --protocol HTTP \
    --port 8040 \
    --vpc-id ${VPC_ID} \
    --target-type ip \
    --health-check-path / \
    --health-check-interval-seconds 30 \
    --health-check-timeout-seconds 5 \
    --healthy-threshold-count 2 \
    --unhealthy-threshold-count 3 \
    --region ${AWS_REGION} \
    --query 'TargetGroups[0].TargetGroupArn' \
    --output text)
  
  echo -e "${GREEN}✓ Target Group created: ${TG_ARN}${NC}"
else
  echo -e "${GREEN}✓ Target Group exists: ${TG_ARN}${NC}"
fi
echo ""

# Step 5: Create Application Load Balancer
echo -e "${BLUE}Step 5: Creating Application Load Balancer...${NC}"
ALB_ARN=$(aws elbv2 describe-load-balancers \
  --names ${ALB_NAME} \
  --region ${AWS_REGION} \
  --query 'LoadBalancers[0].LoadBalancerArn' \
  --output text 2>/dev/null || echo "")

if [ -z "$ALB_ARN" ] || [ "$ALB_ARN" == "None" ]; then
  # Convert subnet IDs to array format
  SUBNET_ARRAY=($(echo $SUBNET_IDS | tr ',' ' '))
  
  ALB_ARN=$(aws elbv2 create-load-balancer \
    --name ${ALB_NAME} \
    --subnets ${SUBNET_ARRAY[@]} \
    --security-groups ${ALB_SG_ID} \
    --scheme internet-facing \
    --type application \
    --ip-address-type ipv4 \
    --region ${AWS_REGION} \
    --query 'LoadBalancers[0].LoadBalancerArn' \
    --output text)
  
  echo -e "${GREEN}✓ Load Balancer created: ${ALB_ARN}${NC}"
  echo -e "${YELLOW}Waiting for ALB to be active (this may take 2-3 minutes)...${NC}"
  
  # Wait for ALB to be active
  aws elbv2 wait load-balancer-available \
    --load-balancer-arns ${ALB_ARN} \
    --region ${AWS_REGION}
  
  echo -e "${GREEN}✓ Load Balancer is active${NC}"
else
  echo -e "${GREEN}✓ Load Balancer exists: ${ALB_ARN}${NC}"
fi
echo ""

# Step 6: Get ALB DNS name
ALB_DNS=$(aws elbv2 describe-load-balancers \
  --load-balancer-arns ${ALB_ARN} \
  --region ${AWS_REGION} \
  --query 'LoadBalancers[0].DNSName' \
  --output text)

echo -e "${GREEN}✓ ALB DNS Name: ${ALB_DNS}${NC}"
echo ""

# Step 7: Create Listener
echo -e "${BLUE}Step 6: Creating HTTP listener...${NC}"
LISTENER_EXISTS=$(aws elbv2 describe-listeners \
  --load-balancer-arn ${ALB_ARN} \
  --region ${AWS_REGION} \
  --query 'Listeners[0].ListenerArn' \
  --output text 2>/dev/null || echo "")

if [ -z "$LISTENER_EXISTS" ] || [ "$LISTENER_EXISTS" == "None" ]; then
  aws elbv2 create-listener \
    --load-balancer-arn ${ALB_ARN} \
    --protocol HTTP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn=${TG_ARN} \
    --region ${AWS_REGION} > /dev/null
  
  echo -e "${GREEN}✓ HTTP Listener created${NC}"
else
  echo -e "${GREEN}✓ Listener exists${NC}"
fi
echo ""

# Step 8: Update ECS Service to use Load Balancer
echo -e "${BLUE}Step 7: Updating ECS service to use load balancer...${NC}"
SERVICE_EXISTS=$(aws ecs describe-services \
  --cluster ${ECS_CLUSTER_NAME} \
  --services ${ECS_SERVICE_NAME} \
  --region ${AWS_REGION} \
  --query 'services[0].status' \
  --output text 2>/dev/null || echo "NONE")

if [ "$SERVICE_EXISTS" = "ACTIVE" ]; then
  # Check if service already has load balancer
  CURRENT_LB=$(aws ecs describe-services \
    --cluster ${ECS_CLUSTER_NAME} \
    --services ${ECS_SERVICE_NAME} \
    --region ${AWS_REGION} \
    --query 'services[0].loadBalancers[0].targetGroupArn' \
    --output text 2>/dev/null || echo "")
  
  if [ -z "$CURRENT_LB" ] || [ "$CURRENT_LB" == "None" ]; then
    # Get current network configuration
    CURRENT_NETWORK=$(aws ecs describe-services \
      --cluster ${ECS_CLUSTER_NAME} \
      --services ${ECS_SERVICE_NAME} \
      --region ${AWS_REGION} \
      --query 'services[0].networkConfiguration' \
      --output json)
    
    # Update service with load balancer
    aws ecs update-service \
      --cluster ${ECS_CLUSTER_NAME} \
      --service ${ECS_SERVICE_NAME} \
      --load-balancers "targetGroupArn=${TG_ARN},containerName=neet-mock-test-container,containerPort=8040" \
      --network-configuration "${CURRENT_NETWORK}" \
      --region ${AWS_REGION} > /dev/null
    
    echo -e "${GREEN}✓ ECS Service updated with load balancer${NC}"
    echo -e "${YELLOW}Service is updating. This may take a few minutes...${NC}"
  else
    echo -e "${GREEN}✓ Service already configured with load balancer${NC}"
  fi
else
  echo -e "${RED}Service does not exist. Please create it first.${NC}"
  exit 1
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Load Balancer Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Application URL:${NC}"
echo -e "${YELLOW}http://${ALB_DNS}${NC}"
echo ""
echo -e "${GREEN}Load Balancer Details:${NC}"
echo -e "  Name: ${ALB_NAME}"
echo -e "  DNS: ${ALB_DNS}"
echo -e "  Target Group: ${TARGET_GROUP_NAME}"
echo ""
echo -e "${YELLOW}Note:${NC}"
echo -e "  - The DNS name is stable and won't change"
echo -e "  - It may take 2-3 minutes for the service to register targets"
echo -e "  - You can set up a custom domain using Route 53"
echo ""
echo -e "${BLUE}To create a TinyURL:${NC}"
echo -e "curl \"http://tinyurl.com/api-create.php?url=http://${ALB_DNS}\""
echo ""
