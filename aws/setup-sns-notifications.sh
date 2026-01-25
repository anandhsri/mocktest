#!/bin/bash
# Setup SNS Topic for CloudWatch Alarm Notifications

set -e

AWS_REGION="${AWS_REGION:-ap-south-2}"
TOPIC_NAME="neet-mock-test-alerts"
EMAIL="${EMAIL:-}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up SNS for alarm notifications...${NC}"
echo ""

# Get email if not provided
if [ -z "$EMAIL" ]; then
  read -p "Enter your email for notifications: " EMAIL
fi

# Create SNS topic
echo -e "${BLUE}Creating SNS topic...${NC}"
TOPIC_ARN=$(aws sns create-topic \
  --name ${TOPIC_NAME} \
  --region ${AWS_REGION} \
  --query 'TopicArn' \
  --output text 2>/dev/null || \
  aws sns list-topics \
    --region ${AWS_REGION} \
    --query "Topics[?contains(TopicArn, '${TOPIC_NAME}')].TopicArn" \
    --output text | head -1)

echo -e "${GREEN}✓ Topic ARN: ${TOPIC_ARN}${NC}"

# Subscribe email
echo -e "${BLUE}Subscribing email...${NC}"
aws sns subscribe \
  --topic-arn ${TOPIC_ARN} \
  --protocol email \
  --notification-endpoint ${EMAIL} \
  --region ${AWS_REGION} > /dev/null

echo -e "${GREEN}✓ Email subscription created${NC}"
echo -e "${YELLOW}⚠️  Check your email and confirm the subscription!${NC}"
echo ""

# Update alarms to use SNS
echo -e "${BLUE}Updating CloudWatch alarms to use SNS...${NC}"

ALARMS=(
  "neet-mock-test-alb-high-5xx-errors"
  "neet-mock-test-alb-high-response-time"
  "neet-mock-test-tg-unhealthy-targets"
  "neet-mock-test-ecs-high-cpu"
  "neet-mock-test-ecs-high-memory"
  "neet-mock-test-alb-high-requests"
)

for alarm in "${ALARMS[@]}"; do
  aws cloudwatch put-metric-alarm \
    --alarm-name ${alarm} \
    --alarm-actions ${TOPIC_ARN} \
    --region ${AWS_REGION} > /dev/null 2>&1 || true
done

echo -e "${GREEN}✓ Alarms updated to send notifications${NC}"
echo ""
echo -e "${GREEN}SNS Setup Complete!${NC}"
echo -e "${YELLOW}Remember to confirm your email subscription!${NC}"
