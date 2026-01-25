#!/bin/bash
# AWS ECS Deployment Script for NEET Mock Test
# Configured for AWS Account: 868522398039

set -e

# Configuration
AWS_ACCOUNT_ID="868522398039"
AWS_REGION="${AWS_REGION:-us-east-1}"
ECR_REPO_NAME="neet-mock-test"
ECS_CLUSTER_NAME="${ECS_CLUSTER_NAME:-neet-mock-test-cluster}"
ECS_SERVICE_NAME="${ECS_SERVICE_NAME:-neet-mock-test-service}"
ECS_TASK_DEFINITION="neet-mock-test"
IMAGE_TAG="${IMAGE_TAG:-latest}"

ECR_REPO_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}NEET Mock Test - AWS Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${YELLOW}AWS Account: ${AWS_ACCOUNT_ID}${NC}"
echo -e "${YELLOW}Region: ${AWS_REGION}${NC}"
echo -e "${YELLOW}ECR Repository: ${ECR_REPO_URI}${NC}"
echo ""

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command -v aws &> /dev/null; then
    echo -e "${RED}ERROR: AWS CLI not found. Please install it first.${NC}"
    echo -e "${YELLOW}Install: brew install awscli${NC}"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo -e "${RED}ERROR: Docker not found. Please install it first.${NC}"
    echo -e "${YELLOW}Install: brew install --cask docker${NC}"
    exit 1
fi

# Verify AWS credentials
echo -e "${BLUE}Verifying AWS credentials...${NC}"
CURRENT_ACCOUNT=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "")

if [ -z "$CURRENT_ACCOUNT" ]; then
    echo -e "${RED}ERROR: AWS credentials not configured.${NC}"
    echo -e "${YELLOW}Run: aws configure${NC}"
    exit 1
fi

if [ "$CURRENT_ACCOUNT" != "$AWS_ACCOUNT_ID" ]; then
    echo -e "${YELLOW}WARNING: Current AWS account (${CURRENT_ACCOUNT}) differs from target (${AWS_ACCOUNT_ID})${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${GREEN}✓ AWS CLI configured${NC}"
echo -e "${GREEN}✓ Docker available${NC}"
echo ""

# Step 1: Login to ECR
echo -e "${BLUE}Step 1: Logging into ECR...${NC}"
aws ecr get-login-password --region ${AWS_REGION} | \
    docker login --username AWS --password-stdin ${ECR_REPO_URI} || {
    echo -e "${RED}Failed to login to ECR${NC}"
    exit 1
}
echo -e "${GREEN}✓ Logged into ECR${NC}"
echo ""

# Step 2: Create ECR repository if it doesn't exist
echo -e "${BLUE}Step 2: Checking ECR repository...${NC}"
if ! aws ecr describe-repositories --repository-names ${ECR_REPO_NAME} --region ${AWS_REGION} &>/dev/null; then
    echo -e "${YELLOW}Creating ECR repository...${NC}"
    aws ecr create-repository \
        --repository-name ${ECR_REPO_NAME} \
        --region ${AWS_REGION} \
        --image-scanning-configuration scanOnPush=true || {
        echo -e "${RED}Failed to create ECR repository${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ ECR repository created${NC}"
else
    echo -e "${GREEN}✓ ECR repository exists${NC}"
fi
echo ""

# Step 3: Build Docker image
echo -e "${BLUE}Step 3: Building Docker image...${NC}"
cd "$(dirname "$0")/.."
docker build -t ${ECR_REPO_NAME}:${IMAGE_TAG} . || {
    echo -e "${RED}Failed to build Docker image${NC}"
    exit 1
}
docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${ECR_REPO_URI}:${IMAGE_TAG}
echo -e "${GREEN}✓ Docker image built and tagged${NC}"
echo ""

# Step 4: Push to ECR
echo -e "${BLUE}Step 4: Pushing image to ECR...${NC}"
docker push ${ECR_REPO_URI}:${IMAGE_TAG} || {
    echo -e "${RED}Failed to push image to ECR${NC}"
    exit 1
}
echo -e "${GREEN}✓ Image pushed to ECR${NC}"
echo ""

# Step 5: Update ECS task definition
echo -e "${BLUE}Step 5: Registering ECS task definition...${NC}"
cd "$(dirname "$0")"
TASK_DEF=$(cat ecs-task-definition.json | sed "s|YOUR_ECR_REPO_URI|${ECR_REPO_URI}|g")
NEW_TASK_DEF=$(aws ecs register-task-definition \
    --cli-input-json "${TASK_DEF}" \
    --region ${AWS_REGION} \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text) || {
    echo -e "${RED}Failed to register task definition${NC}"
    exit 1
}

echo -e "${GREEN}✓ Task definition registered${NC}"
echo -e "${YELLOW}Task Definition ARN: ${NEW_TASK_DEF}${NC}"
echo ""

# Step 6: Create cluster if it doesn't exist
echo -e "${BLUE}Step 6: Checking ECS cluster...${NC}"
if ! aws ecs describe-clusters --clusters ${ECS_CLUSTER_NAME} --region ${AWS_REGION} --query 'clusters[0].status' --output text 2>/dev/null | grep -q "ACTIVE"; then
    echo -e "${YELLOW}Creating ECS cluster...${NC}"
    aws ecs create-cluster \
        --cluster-name ${ECS_CLUSTER_NAME} \
        --region ${AWS_REGION} || {
        echo -e "${RED}Failed to create cluster${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Cluster created${NC}"
else
    echo -e "${GREEN}✓ Cluster exists${NC}"
fi
echo ""

# Step 7: Update or create ECS service
echo -e "${BLUE}Step 7: Updating ECS service...${NC}"
SERVICE_EXISTS=$(aws ecs describe-services \
    --cluster ${ECS_CLUSTER_NAME} \
    --services ${ECS_SERVICE_NAME} \
    --region ${AWS_REGION} \
    --query 'services[0].status' \
    --output text 2>/dev/null || echo "NONE")

if [ "$SERVICE_EXISTS" = "ACTIVE" ]; then
    echo -e "${YELLOW}Service exists, updating...${NC}"
    aws ecs update-service \
        --cluster ${ECS_CLUSTER_NAME} \
        --service ${ECS_SERVICE_NAME} \
        --task-definition ${NEW_TASK_DEF} \
        --force-new-deployment \
        --region ${AWS_REGION} > /dev/null || {
        echo -e "${RED}Failed to update service${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Service updated${NC}"
    echo -e "${YELLOW}Deployment in progress. Check AWS Console for status.${NC}"
else
    echo -e "${YELLOW}Service does not exist.${NC}"
    echo -e "${YELLOW}You need to create the service manually via AWS Console or CLI.${NC}"
    echo ""
    echo -e "${BLUE}To create service, you need:${NC}"
    echo -e "  - VPC ID"
    echo -e "  - Subnet IDs (at least 2)"
    echo -e "  - Security Group ID (allowing port 8040)"
    echo ""
    echo -e "${BLUE}Task Definition ARN: ${NEW_TASK_DEF}${NC}"
    echo -e "${BLUE}Cluster: ${ECS_CLUSTER_NAME}${NC}"
    echo ""
    echo -e "${YELLOW}See aws/DEPLOY_NOW.md for manual service creation steps.${NC}"
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Deployment completed!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Check ECS service status in AWS Console"
echo -e "  2. Get public IP from running task"
echo -e "  3. Access app at: http://<PUBLIC_IP>:8040"
echo ""
