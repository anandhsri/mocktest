#!/bin/bash
# Create ECS Service for NEET Mock Test

set -e

AWS_REGION="${AWS_REGION:-us-east-1}"
ECS_CLUSTER_NAME="neet-mock-test-cluster"
ECS_SERVICE_NAME="neet-mock-test-service"
ECS_TASK_DEFINITION="neet-mock-test:1"

# VPC and Network Configuration
VPC_ID="vpc-03188f6468fa25a10"
# Get first two subnets from default VPC
SUBNET_1=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=${VPC_ID}" --query 'Subnets[0].SubnetId' --output text --region ${AWS_REGION})
SUBNET_2=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=${VPC_ID}" --query 'Subnets[1].SubnetId' --output text --region ${AWS_REGION})

# Get security group
SG_ID=$(aws ec2 describe-security-groups \
  --filters "Name=group-name,Values=neet-mock-test-sg" \
  --query 'SecurityGroups[0].GroupId' \
  --output text \
  --region ${AWS_REGION})

if [ -z "$SG_ID" ] || [ "$SG_ID" == "None" ]; then
  echo "Creating security group..."
  SG_ID=$(aws ec2 create-security-group \
    --group-name neet-mock-test-sg \
    --description "Security group for NEET Mock Test ECS service" \
    --vpc-id ${VPC_ID} \
    --region ${AWS_REGION} \
    --query 'GroupId' \
    --output text)
  
  # Allow port 8040
  aws ec2 authorize-security-group-ingress \
    --group-id ${SG_ID} \
    --protocol tcp \
    --port 8040 \
    --cidr 0.0.0.0/0 \
    --region ${AWS_REGION} 2>/dev/null || true
fi

echo "Creating ECS service..."
echo "Cluster: ${ECS_CLUSTER_NAME}"
echo "Service: ${ECS_SERVICE_NAME}"
echo "Task Definition: ${ECS_TASK_DEFINITION}"
echo "Security Group: ${SG_ID}"
echo "Subnets: ${SUBNET_1}, ${SUBNET_2}"

aws ecs create-service \
  --cluster ${ECS_CLUSTER_NAME} \
  --service-name ${ECS_SERVICE_NAME} \
  --task-definition ${ECS_TASK_DEFINITION} \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_1},${SUBNET_2}],securityGroups=[${SG_ID}],assignPublicIp=ENABLED}" \
  --region ${AWS_REGION}

echo ""
echo "Service created successfully!"
echo "Waiting for service to stabilize..."
sleep 10

# Get service status
aws ecs describe-services \
  --cluster ${ECS_CLUSTER_NAME} \
  --services ${ECS_SERVICE_NAME} \
  --region ${AWS_REGION} \
  --query 'services[0].[status,runningCount,desiredCount]' \
  --output table

echo ""
echo "To get the public IP of your running task:"
echo "aws ecs list-tasks --cluster ${ECS_CLUSTER_NAME} --service-name ${ECS_SERVICE_NAME} --region ${AWS_REGION}"
echo ""
echo "Then get task details to find the public IP."
