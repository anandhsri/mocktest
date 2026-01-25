#!/bin/bash
# Delete ECS service and resources in us-east-1

set -e

AWS_REGION="us-east-1"
ECS_CLUSTER_NAME="neet-mock-test-cluster"
ECS_SERVICE_NAME="neet-mock-test-service"
ECR_REPO_NAME="neet-mock-test"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${RED}Deleting resources in us-east-1${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Delete ECS Service
echo -e "${BLUE}Step 1: Deleting ECS service...${NC}"
SERVICE_EXISTS=$(aws ecs describe-services \
    --cluster ${ECS_CLUSTER_NAME} \
    --services ${ECS_SERVICE_NAME} \
    --region ${AWS_REGION} \
    --query 'services[0].status' \
    --output text 2>/dev/null || echo "NONE")

if [ "$SERVICE_EXISTS" = "ACTIVE" ]; then
    echo -e "${YELLOW}Scaling down service to 0 tasks...${NC}"
    aws ecs update-service \
        --cluster ${ECS_CLUSTER_NAME} \
        --service ${ECS_SERVICE_NAME} \
        --desired-count 0 \
        --region ${AWS_REGION} > /dev/null
    
    echo -e "${YELLOW}Waiting for tasks to stop...${NC}"
    sleep 10
    
    echo -e "${YELLOW}Deleting service...${NC}"
    aws ecs delete-service \
        --cluster ${ECS_CLUSTER_NAME} \
        --service ${ECS_SERVICE_NAME} \
        --force \
        --region ${AWS_REGION} > /dev/null
    
    echo -e "${GREEN}✓ Service deleted${NC}"
else
    echo -e "${YELLOW}Service does not exist or already deleted${NC}"
fi
echo ""

# Step 2: Delete ECS Cluster
echo -e "${BLUE}Step 2: Deleting ECS cluster...${NC}"
CLUSTER_EXISTS=$(aws ecs describe-clusters \
    --clusters ${ECS_CLUSTER_NAME} \
    --region ${AWS_REGION} \
    --query 'clusters[0].status' \
    --output text 2>/dev/null || echo "NONE")

if [ "$CLUSTER_EXISTS" = "ACTIVE" ]; then
    aws ecs delete-cluster \
        --cluster ${ECS_CLUSTER_NAME} \
        --region ${AWS_REGION} > /dev/null
    
    echo -e "${GREEN}✓ Cluster deleted${NC}"
else
    echo -e "${YELLOW}Cluster does not exist or already deleted${NC}"
fi
echo ""

# Step 3: Delete ECR repository images (optional - keeping repo for now)
echo -e "${BLUE}Step 3: Cleaning up ECR images...${NC}"
REPO_EXISTS=$(aws ecr describe-repositories \
    --repository-names ${ECR_REPO_NAME} \
    --region ${AWS_REGION} \
    --query 'repositories[0].repositoryName' \
    --output text 2>/dev/null || echo "NONE")

if [ "$REPO_EXISTS" != "NONE" ] && [ -n "$REPO_EXISTS" ]; then
    echo -e "${YELLOW}Deleting all images in ECR repository...${NC}"
    IMAGE_TAGS=$(aws ecr list-images \
        --repository-name ${ECR_REPO_NAME} \
        --region ${AWS_REGION} \
        --query 'imageIds[*]' \
        --output json 2>/dev/null || echo "[]")
    
    if [ "$IMAGE_TAGS" != "[]" ] && [ -n "$IMAGE_TAGS" ]; then
        aws ecr batch-delete-image \
            --repository-name ${ECR_REPO_NAME} \
            --image-ids "$IMAGE_TAGS" \
            --region ${AWS_REGION} > /dev/null 2>&1 || true
        echo -e "${GREEN}✓ Images deleted${NC}"
    else
        echo -e "${YELLOW}No images to delete${NC}"
    fi
    
    echo -e "${YELLOW}Deleting ECR repository...${NC}"
    aws ecr delete-repository \
        --repository-name ${ECR_REPO_NAME} \
        --force \
        --region ${AWS_REGION} > /dev/null 2>&1 || {
        echo -e "${YELLOW}Repository may have dependencies, skipping deletion${NC}"
    }
    echo -e "${GREEN}✓ ECR repository deleted${NC}"
else
    echo -e "${YELLOW}ECR repository does not exist${NC}"
fi
echo ""

# Step 4: Delete CloudWatch Log Group
echo -e "${BLUE}Step 4: Deleting CloudWatch log group...${NC}"
LOG_GROUP_EXISTS=$(aws logs describe-log-groups \
    --log-group-name-prefix /ecs/neet-mock-test \
    --region ${AWS_REGION} \
    --query 'logGroups[?logGroupName==`/ecs/neet-mock-test`].logGroupName' \
    --output text 2>/dev/null || echo "")

if [ -n "$LOG_GROUP_EXISTS" ]; then
    aws logs delete-log-group \
        --log-group-name /ecs/neet-mock-test \
        --region ${AWS_REGION} > /dev/null 2>&1 || true
    echo -e "${GREEN}✓ Log group deleted${NC}"
else
    echo -e "${YELLOW}Log group does not exist${NC}"
fi
echo ""

# Step 5: Delete Security Group (optional - keeping for now as it might be used elsewhere)
echo -e "${BLUE}Step 5: Security group cleanup...${NC}"
echo -e "${YELLOW}Note: Security group 'neet-mock-test-sg' is kept for safety.${NC}"
echo -e "${YELLOW}You can delete it manually if not needed:${NC}"
echo -e "${YELLOW}aws ec2 delete-security-group --group-id <sg-id> --region ${AWS_REGION}${NC}"
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Cleanup completed!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Summary:${NC}"
echo "  ✓ ECS Service deleted"
echo "  ✓ ECS Cluster deleted"
echo "  ✓ ECR Repository and images deleted"
echo "  ✓ CloudWatch Log Group deleted"
echo ""
echo -e "${GREEN}All resources in us-east-1 have been cleaned up!${NC}"
