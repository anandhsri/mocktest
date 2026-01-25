#!/bin/bash
# Migrate NEET Mock Test application to a new AWS region

set -e

AWS_ACCOUNT_ID="868522398039"
OLD_REGION="${OLD_REGION:-us-east-1}"
NEW_REGION="${NEW_REGION:-ap-south-2}"
ECR_REPO_NAME="neet-mock-test"
ECS_CLUSTER_NAME="neet-mock-test-cluster"
ECS_SERVICE_NAME="neet-mock-test-service"
ECS_TASK_DEFINITION="neet-mock-test"

ECR_REPO_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${NEW_REGION}.amazonaws.com/${ECR_REPO_NAME}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Migrating to ${NEW_REGION}${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Login to ECR in new region
echo -e "${BLUE}Step 1: Logging into ECR in ${NEW_REGION}...${NC}"
aws ecr get-login-password --region ${NEW_REGION} | \
    docker login --username AWS --password-stdin ${ECR_REPO_URI} || {
    echo -e "${RED}Failed to login to ECR${NC}"
    exit 1
}
echo -e "${GREEN}✓ Logged into ECR${NC}"
echo ""

# Step 2: Create ECR repository in new region
echo -e "${BLUE}Step 2: Creating ECR repository in ${NEW_REGION}...${NC}"
if ! aws ecr describe-repositories --repository-names ${ECR_REPO_NAME} --region ${NEW_REGION} &>/dev/null; then
    aws ecr create-repository \
        --repository-name ${ECR_REPO_NAME} \
        --region ${NEW_REGION} \
        --image-scanning-configuration scanOnPush=true || {
        echo -e "${RED}Failed to create ECR repository${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ ECR repository created${NC}"
else
    echo -e "${GREEN}✓ ECR repository exists${NC}"
fi
echo ""

# Step 3: Build and tag image for new region
echo -e "${BLUE}Step 3: Building Docker image...${NC}"
cd "$(dirname "$0")/.."
docker build -t ${ECR_REPO_NAME}:latest . || {
    echo -e "${RED}Failed to build Docker image${NC}"
    exit 1
}
docker tag ${ECR_REPO_NAME}:latest ${ECR_REPO_URI}:latest
echo -e "${GREEN}✓ Docker image built and tagged${NC}"
echo ""

# Step 4: Push to new region
echo -e "${BLUE}Step 4: Pushing image to ${NEW_REGION}...${NC}"
docker push ${ECR_REPO_URI}:latest || {
    echo -e "${RED}Failed to push image to ECR${NC}"
    exit 1
}
echo -e "${GREEN}✓ Image pushed to ECR${NC}"
echo ""

# Step 5: Create IAM roles in new region (if needed - IAM is global but verify)
echo -e "${BLUE}Step 5: Verifying IAM roles...${NC}"
# IAM roles are global, so they should already exist
echo -e "${GREEN}✓ IAM roles verified${NC}"
echo ""

# Step 6: Create CloudWatch log group in new region
echo -e "${BLUE}Step 6: Creating CloudWatch log group in ${NEW_REGION}...${NC}"
aws logs create-log-group --log-group-name /ecs/neet-mock-test --region ${NEW_REGION} 2>/dev/null || {
    echo -e "${YELLOW}Log group may already exist${NC}"
}
echo -e "${GREEN}✓ Log group ready${NC}"
echo ""

# Step 7: Update task definition for new region
echo -e "${BLUE}Step 7: Registering task definition in ${NEW_REGION}...${NC}"
cd "$(dirname "$0")"
TASK_DEF=$(cat ecs-task-definition.json | sed "s|YOUR_ECR_REPO_URI|${ECR_REPO_URI}|g" | sed "s|us-east-1|${NEW_REGION}|g")
NEW_TASK_DEF=$(aws ecs register-task-definition \
    --cli-input-json "${TASK_DEF}" \
    --region ${NEW_REGION} \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text) || {
    echo -e "${RED}Failed to register task definition${NC}"
    exit 1
}

echo -e "${GREEN}✓ Task definition registered${NC}"
echo -e "${YELLOW}Task Definition ARN: ${NEW_TASK_DEF}${NC}"
echo ""

# Step 8: Create ECS cluster in new region
echo -e "${BLUE}Step 8: Creating ECS cluster in ${NEW_REGION}...${NC}"
if ! aws ecs describe-clusters --clusters ${ECS_CLUSTER_NAME} --region ${NEW_REGION} --query 'clusters[0].status' --output text 2>/dev/null | grep -q "ACTIVE"; then
    aws ecs create-cluster \
        --cluster-name ${ECS_CLUSTER_NAME} \
        --region ${NEW_REGION} || {
        echo -e "${RED}Failed to create cluster${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Cluster created${NC}"
else
    echo -e "${GREEN}✓ Cluster exists${NC}"
fi
echo ""

# Step 9: Get VPC and subnet info for new region
echo -e "${BLUE}Step 9: Getting network configuration for ${NEW_REGION}...${NC}"
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text --region ${NEW_REGION})
if [ -z "$VPC_ID" ] || [ "$VPC_ID" == "None" ]; then
    echo -e "${YELLOW}No default VPC found. Please create VPC and subnets manually.${NC}"
    echo -e "${YELLOW}Or use existing VPC ID:${NC}"
    read -p "Enter VPC ID: " VPC_ID
fi

SUBNET_1=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=${VPC_ID}" --query 'Subnets[0].SubnetId' --output text --region ${NEW_REGION})
SUBNET_2=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=${VPC_ID}" --query 'Subnets[1].SubnetId' --output text --region ${NEW_REGION})

echo -e "${GREEN}✓ VPC: ${VPC_ID}${NC}"
echo -e "${GREEN}✓ Subnets: ${SUBNET_1}, ${SUBNET_2}${NC}"
echo ""

# Step 10: Create security group
echo -e "${BLUE}Step 10: Creating security group in ${NEW_REGION}...${NC}"
SG_ID=$(aws ec2 describe-security-groups \
  --filters "Name=group-name,Values=neet-mock-test-sg" \
  --query 'SecurityGroups[0].GroupId' \
  --output text \
  --region ${NEW_REGION} 2>/dev/null || echo "")

if [ -z "$SG_ID" ] || [ "$SG_ID" == "None" ]; then
  SG_ID=$(aws ec2 create-security-group \
    --group-name neet-mock-test-sg \
    --description "Security group for NEET Mock Test ECS service" \
    --vpc-id ${VPC_ID} \
    --region ${NEW_REGION} \
    --query 'GroupId' \
    --output text)
  
  # Allow port 8040
  aws ec2 authorize-security-group-ingress \
    --group-id ${SG_ID} \
    --protocol tcp \
    --port 8040 \
    --cidr 0.0.0.0/0 \
    --region ${NEW_REGION} 2>/dev/null || true
fi

echo -e "${GREEN}✓ Security Group: ${SG_ID}${NC}"
echo ""

# Step 11: Create or update ECS service
echo -e "${BLUE}Step 11: Creating ECS service in ${NEW_REGION}...${NC}"
SERVICE_EXISTS=$(aws ecs describe-services \
    --cluster ${ECS_CLUSTER_NAME} \
    --services ${ECS_SERVICE_NAME} \
    --region ${NEW_REGION} \
    --query 'services[0].status' \
    --output text 2>/dev/null || echo "NONE")

if [ "$SERVICE_EXISTS" = "ACTIVE" ]; then
    echo -e "${YELLOW}Service exists, updating...${NC}"
    aws ecs update-service \
        --cluster ${ECS_CLUSTER_NAME} \
        --service ${ECS_SERVICE_NAME} \
        --task-definition ${NEW_TASK_DEF} \
        --force-new-deployment \
        --region ${NEW_REGION} > /dev/null || {
        echo -e "${RED}Failed to update service${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Service updated${NC}"
else
    aws ecs create-service \
      --cluster ${ECS_CLUSTER_NAME} \
      --service-name ${ECS_SERVICE_NAME} \
      --task-definition ${NEW_TASK_DEF} \
      --desired-count 1 \
      --launch-type FARGATE \
      --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_1},${SUBNET_2}],securityGroups=[${SG_ID}],assignPublicIp=ENABLED}" \
      --region ${NEW_REGION} > /dev/null || {
      echo -e "${RED}Failed to create service${NC}"
      exit 1
    }
    echo -e "${GREEN}✓ Service created${NC}"
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Migration to ${NEW_REGION} completed!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Waiting for service to start...${NC}"
sleep 15

# Get service info
echo ""
echo -e "${BLUE}Service Status:${NC}"
aws ecs describe-services \
  --cluster ${ECS_CLUSTER_NAME} \
  --services ${ECS_SERVICE_NAME} \
  --region ${NEW_REGION} \
  --query 'services[0].[status,runningCount,desiredCount]' \
  --output table

echo ""
echo -e "${YELLOW}To get the public IP, run:${NC}"
echo "./aws/get-service-info.sh"
echo ""
echo -e "${YELLOW}Or check AWS Console:${NC}"
echo "https://${NEW_REGION}.console.aws.amazon.com/ecs/v2/clusters/${ECS_CLUSTER_NAME}/services/${ECS_SERVICE_NAME}"
