#!/bin/bash
# Script to create required IAM roles for ECS Fargate

set -e

AWS_ACCOUNT_ID="868522398039"
AWS_REGION="${AWS_REGION:-us-east-1}"

echo "Creating IAM roles for ECS Fargate..."

# Create trust policy for execution role
cat > /tmp/ecs-trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

# Create execution role policy
cat > /tmp/ecs-execution-role-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
EOF

# Create execution role
echo "Creating ecsTaskExecutionRole..."
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file:///tmp/ecs-trust-policy.json \
  --region ${AWS_REGION} 2>/dev/null || echo "Role may already exist"

# Attach managed policy
aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy \
  --region ${AWS_REGION} 2>/dev/null || echo "Policy may already be attached"

# Create task role (for application permissions)
echo "Creating ecsTaskRole..."
aws iam create-role \
  --role-name ecsTaskRole \
  --assume-role-policy-document file:///tmp/ecs-trust-policy.json \
  --region ${AWS_REGION} 2>/dev/null || echo "Role may already exist"

echo ""
echo "IAM roles created/verified:"
echo "  - ecsTaskExecutionRole (for ECS to pull images and write logs)"
echo "  - ecsTaskRole (for application permissions)"
echo ""
echo "You can now run the deployment script again."

# Cleanup
rm -f /tmp/ecs-trust-policy.json /tmp/ecs-execution-role-policy.json
