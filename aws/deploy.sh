#!/bin/bash
# AWS ECS Deployment Script for NEET Mock Test

set -e

# Configuration
AWS_REGION="${AWS_REGION:-us-east-1}"
ECR_REPO_NAME="neet-mock-test"
ECS_CLUSTER_NAME="${ECS_CLUSTER_NAME:-neet-mock-test-cluster}"
ECS_SERVICE_NAME="${ECS_SERVICE_NAME:-neet-mock-test-service}"
ECS_TASK_DEFINITION="neet-mock-test"
IMAGE_TAG="${IMAGE_TAG:-latest}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting AWS ECS Deployment...${NC}"

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPO_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"

echo -e "${YELLOW}AWS Account ID: ${AWS_ACCOUNT_ID}${NC}"
echo -e "${YELLOW}ECR Repository: ${ECR_REPO_URI}${NC}"
echo -e "${YELLOW}Region: ${AWS_REGION}${NC}"

# Step 1: Login to ECR
echo -e "\n${GREEN}Step 1: Logging into ECR...${NC}"
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO_URI}

# Step 2: Create ECR repository if it doesn't exist
echo -e "\n${GREEN}Step 2: Checking ECR repository...${NC}"
if ! aws ecr describe-repositories --repository-names ${ECR_REPO_NAME} --region ${AWS_REGION} &>/dev/null; then
    echo -e "${YELLOW}Creating ECR repository...${NC}"
    aws ecr create-repository --repository-name ${ECR_REPO_NAME} --region ${AWS_REGION}
fi

# Step 3: Build Docker image
echo -e "\n${GREEN}Step 3: Building Docker image...${NC}"
docker build -t ${ECR_REPO_NAME}:${IMAGE_TAG} .
docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${ECR_REPO_URI}:${IMAGE_TAG}

# Step 4: Push to ECR
echo -e "\n${GREEN}Step 4: Pushing image to ECR...${NC}"
docker push ${ECR_REPO_URI}:${IMAGE_TAG}

# Step 5: Update ECS task definition
echo -e "\n${GREEN}Step 5: Updating ECS task definition...${NC}"
cd "$(dirname "$0")"
TASK_DEF=$(cat ecs-task-definition.json | sed "s|YOUR_ECR_REPO_URI|${ECR_REPO_URI}|g")
NEW_TASK_DEF=$(aws ecs register-task-definition \
    --cli-input-json "${TASK_DEF}" \
    --region ${AWS_REGION} \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text)

echo -e "${GREEN}New task definition: ${NEW_TASK_DEF}${NC}"

# Step 6: Update ECS service (if it exists)
echo -e "\n${GREEN}Step 6: Updating ECS service...${NC}"
if aws ecs describe-services --cluster ${ECS_CLUSTER_NAME} --services ${ECS_SERVICE_NAME} --region ${AWS_REGION} --query 'services[0].status' --output text 2>/dev/null | grep -q "ACTIVE"; then
    aws ecs update-service \
        --cluster ${ECS_CLUSTER_NAME} \
        --service ${ECS_SERVICE_NAME} \
        --task-definition ${NEW_TASK_DEF} \
        --force-new-deployment \
        --region ${AWS_REGION} > /dev/null
    echo -e "${GREEN}Service updated successfully!${NC}"
    echo -e "${YELLOW}Deployment in progress. Check ECS console for status.${NC}"
else
    echo -e "${YELLOW}Service ${ECS_SERVICE_NAME} not found. Please create it first using AWS Console or CLI.${NC}"
    echo -e "${YELLOW}Task definition registered: ${NEW_TASK_DEF}${NC}"
fi

echo -e "\n${GREEN}Deployment completed!${NC}"
