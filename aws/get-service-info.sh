#!/bin/bash
# Get ECS Service Information and Public IP

AWS_REGION="${AWS_REGION:-ap-south-2}"
ECS_CLUSTER_NAME="neet-mock-test-cluster"
ECS_SERVICE_NAME="neet-mock-test-service"

echo "=== ECS Service Status ==="
aws ecs describe-services \
  --cluster ${ECS_CLUSTER_NAME} \
  --services ${ECS_SERVICE_NAME} \
  --region ${AWS_REGION} \
  --query 'services[0].[status,runningCount,desiredCount,pendingCount]' \
  --output table

echo ""
echo "=== Recent Events ==="
aws ecs describe-services \
  --cluster ${ECS_CLUSTER_NAME} \
  --services ${ECS_SERVICE_NAME} \
  --region ${AWS_REGION} \
  --query 'services[0].events[0:5]' \
  --output table

echo ""
echo "=== Running Tasks ==="
TASK_ARN=$(aws ecs list-tasks \
  --cluster ${ECS_CLUSTER_NAME} \
  --service-name ${ECS_SERVICE_NAME} \
  --region ${AWS_REGION} \
  --query 'taskArns[0]' \
  --output text)

if [ "$TASK_ARN" != "None" ] && [ -n "$TASK_ARN" ]; then
  echo "Task ARN: $TASK_ARN"
  
  # Get task details
  ENI_ID=$(aws ecs describe-tasks \
    --cluster ${ECS_CLUSTER_NAME} \
    --tasks ${TASK_ARN} \
    --region ${AWS_REGION} \
    --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' \
    --output text)
  
  if [ -n "$ENI_ID" ] && [ "$ENI_ID" != "None" ]; then
    PUBLIC_IP=$(aws ec2 describe-network-interfaces \
      --network-interface-ids ${ENI_ID} \
      --region ${AWS_REGION} \
      --query 'NetworkInterfaces[0].Association.PublicIp' \
      --output text)
    
    echo ""
    echo "=== Application Access ==="
    echo "Public IP: $PUBLIC_IP"
    echo "URL: http://${PUBLIC_IP}:8040"
  else
    echo "Network interface not found yet. Task may still be starting..."
  fi
else
  echo "No tasks running yet. Service may still be starting..."
  echo "Check CloudWatch Logs: /ecs/neet-mock-test"
fi

echo ""
echo "=== View Logs ==="
echo "aws logs tail /ecs/neet-mock-test --follow --region ${AWS_REGION}"
