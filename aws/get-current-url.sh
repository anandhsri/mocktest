#!/bin/bash
# Get current public IP and create/update TinyURL

AWS_REGION="${AWS_REGION:-ap-south-2}"
ECS_CLUSTER_NAME="neet-mock-test-cluster"
ECS_SERVICE_NAME="neet-mock-test-service"

echo "Getting current service information..."

# Get task ARN
TASK_ARN=$(aws ecs list-tasks \
  --cluster ${ECS_CLUSTER_NAME} \
  --service-name ${ECS_SERVICE_NAME} \
  --region ${AWS_REGION} \
  --query 'taskArns[0]' \
  --output text)

if [ -z "$TASK_ARN" ] || [ "$TASK_ARN" == "None" ]; then
  echo "No running tasks found. Service may be starting..."
  exit 1
fi

# Get network interface ID
ENI_ID=$(aws ecs describe-tasks \
  --cluster ${ECS_CLUSTER_NAME} \
  --tasks ${TASK_ARN} \
  --region ${AWS_REGION} \
  --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' \
  --output text)

if [ -z "$ENI_ID" ] || [ "$ENI_ID" == "None" ]; then
  echo "Network interface not found. Task may still be starting..."
  exit 1
fi

# Get public IP
PUBLIC_IP=$(aws ec2 describe-network-interfaces \
  --network-interface-ids ${ENI_ID} \
  --region ${AWS_REGION} \
  --query 'NetworkInterfaces[0].Association.PublicIp' \
  --output text)

if [ -z "$PUBLIC_IP" ] || [ "$PUBLIC_IP" == "None" ]; then
  echo "Public IP not found."
  exit 1
fi

URL="http://${PUBLIC_IP}:8040"
echo ""
echo "Current Application URL: ${URL}"
echo ""

# Create TinyURL
echo "Creating TinyURL..."
TINYURL=$(curl -s "http://tinyurl.com/api-create.php?url=${URL}")

if [ -n "$TINYURL" ] && [[ "$TINYURL" == http* ]]; then
  echo ""
  echo "✅ TinyURL created: ${TINYURL}"
  echo ""
  echo "Share this link: ${TINYURL}"
  echo "Original URL: ${URL}"
else
  echo "Failed to create TinyURL"
  exit 1
fi
