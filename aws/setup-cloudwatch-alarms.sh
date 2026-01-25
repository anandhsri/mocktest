#!/bin/bash
# Setup CloudWatch Alarms for Monitoring

set -e

AWS_REGION="${AWS_REGION:-ap-south-2}"
ALB_NAME="neet-mock-test-alb"
ECS_CLUSTER_NAME="neet-mock-test-cluster"
ECS_SERVICE_NAME="neet-mock-test-service"
TARGET_GROUP_NAME="neet-mock-test-tg"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Setting up CloudWatch Alarms${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Get resource ARNs
ALB_ARN=$(aws elbv2 describe-load-balancers \
  --names ${ALB_NAME} \
  --region ${AWS_REGION} \
  --query 'LoadBalancers[0].LoadBalancerArn' \
  --output text)

TG_ARN=$(aws elbv2 describe-target-groups \
  --names ${TARGET_GROUP_NAME} \
  --region ${AWS_REGION} \
  --query 'TargetGroups[0].TargetGroupArn' \
  --output text)

ALB_NAME_SHORT=$(echo $ALB_ARN | cut -d'/' -f2-3 | tr '/' '-')
TG_NAME_SHORT=$(echo $TG_ARN | cut -d'/' -f2-3 | tr '/' '-')

echo -e "${BLUE}Creating CloudWatch Alarms...${NC}"
echo ""

# Alarm 1: ALB - High HTTP 5xx Error Rate
echo -e "${BLUE}Alarm 1: High HTTP 5xx Error Rate${NC}"
aws cloudwatch put-metric-alarm \
  --alarm-name "neet-mock-test-alb-high-5xx-errors" \
  --alarm-description "Alert when ALB returns high 5xx error rate" \
  --metric-name HTTPCode_Target_5XX_Count \
  --namespace AWS/ApplicationELB \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=LoadBalancer,Value=${ALB_NAME_SHORT} \
  --region ${AWS_REGION} \
  --treat-missing-data notBreaching > /dev/null 2>&1 || echo "Alarm may already exist"

echo -e "${GREEN}✓ Created: High 5xx Error Rate Alarm${NC}"

# Alarm 2: ALB - High Response Time
echo -e "${BLUE}Alarm 2: High Response Time${NC}"
aws cloudwatch put-metric-alarm \
  --alarm-name "neet-mock-test-alb-high-response-time" \
  --alarm-description "Alert when ALB response time is high" \
  --metric-name TargetResponseTime \
  --namespace AWS/ApplicationELB \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 2 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=LoadBalancer,Value=${ALB_NAME_SHORT} \
  --region ${AWS_REGION} \
  --treat-missing-data notBreaching > /dev/null 2>&1 || echo "Alarm may already exist"

echo -e "${GREEN}✓ Created: High Response Time Alarm${NC}"

# Alarm 3: Target Group - Unhealthy Targets
echo -e "${BLUE}Alarm 3: Unhealthy Targets${NC}"
aws cloudwatch put-metric-alarm \
  --alarm-name "neet-mock-test-tg-unhealthy-targets" \
  --alarm-description "Alert when target group has unhealthy targets" \
  --metric-name UnHealthyHostCount \
  --namespace AWS/ApplicationELB \
  --statistic Average \
  --period 60 \
  --evaluation-periods 2 \
  --threshold 1 \
  --comparison-operator GreaterThanOrEqualToThreshold \
  --dimensions Name=TargetGroup,Value=${TG_NAME_SHORT} Name=LoadBalancer,Value=${ALB_NAME_SHORT} \
  --region ${AWS_REGION} \
  --treat-missing-data notBreaching > /dev/null 2>&1 || echo "Alarm may already exist"

echo -e "${GREEN}✓ Created: Unhealthy Targets Alarm${NC}"

# Alarm 4: ECS - Service CPU High
echo -e "${BLUE}Alarm 4: High CPU Utilization${NC}"
aws cloudwatch put-metric-alarm \
  --alarm-name "neet-mock-test-ecs-high-cpu" \
  --alarm-description "Alert when ECS service CPU is high" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=ClusterName,Value=${ECS_CLUSTER_NAME} Name=ServiceName,Value=${ECS_SERVICE_NAME} \
  --region ${AWS_REGION} \
  --treat-missing-data notBreaching > /dev/null 2>&1 || echo "Alarm may already exist"

echo -e "${GREEN}✓ Created: High CPU Utilization Alarm${NC}"

# Alarm 5: ECS - Service Memory High
echo -e "${BLUE}Alarm 5: High Memory Utilization${NC}"
aws cloudwatch put-metric-alarm \
  --alarm-name "neet-mock-test-ecs-high-memory" \
  --alarm-description "Alert when ECS service memory is high" \
  --metric-name MemoryUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=ClusterName,Value=${ECS_CLUSTER_NAME} Name=ServiceName,Value=${ECS_SERVICE_NAME} \
  --region ${AWS_REGION} \
  --treat-missing-data notBreaching > /dev/null 2>&1 || echo "Alarm may already exist"

echo -e "${GREEN}✓ Created: High Memory Utilization Alarm${NC}"

# Alarm 6: ALB - Request Count (Optional - for scaling)
echo -e "${BLUE}Alarm 6: High Request Count${NC}"
aws cloudwatch put-metric-alarm \
  --alarm-name "neet-mock-test-alb-high-requests" \
  --alarm-description "Alert when request count is high (for scaling)" \
  --metric-name RequestCount \
  --namespace AWS/ApplicationELB \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 1000 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=LoadBalancer,Value=${ALB_NAME_SHORT} \
  --region ${AWS_REGION} \
  --treat-missing-data notBreaching > /dev/null 2>&1 || echo "Alarm may already exist"

echo -e "${GREEN}✓ Created: High Request Count Alarm${NC}"

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}CloudWatch Alarms Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Created 6 CloudWatch Alarms:${NC}"
echo -e "  1. High HTTP 5xx Error Rate"
echo -e "  2. High Response Time"
echo -e "  3. Unhealthy Targets"
echo -e "  4. High CPU Utilization"
echo -e "  5. High Memory Utilization"
echo -e "  6. High Request Count"
echo ""
echo -e "${YELLOW}View alarms:${NC}"
echo -e "https://${AWS_REGION}.console.aws.amazon.com/cloudwatch/home?region=${AWS_REGION}#alarmsV2:"
echo ""
echo -e "${BLUE}To configure SNS notifications:${NC}"
echo -e "  1. Create an SNS topic"
echo -e "  2. Subscribe your email to the topic"
echo -e "  3. Update alarms to send notifications to the topic"
echo ""
echo -e "${YELLOW}Example SNS setup:${NC}"
echo "aws sns create-topic --name neet-mock-test-alerts --region ${AWS_REGION}"
echo "aws sns subscribe --topic-arn <TOPIC_ARN> --protocol email --notification-endpoint your@email.com"
