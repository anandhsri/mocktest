#!/bin/bash
# Complete Setup: HTTPS + Route 53 + CloudWatch Alarms

set -e

AWS_REGION="${AWS_REGION:-ap-south-2}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Complete Advanced Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: CloudWatch Alarms (no dependencies)
echo -e "${BLUE}Step 1: Setting up CloudWatch Alarms...${NC}"
./setup-cloudwatch-alarms.sh
echo ""

# Step 2: SNS Notifications (optional)
echo -e "${BLUE}Step 2: SNS Notifications (Optional)${NC}"
read -p "Set up email notifications for alarms? (y/n): " SETUP_SNS

if [ "$SETUP_SNS" = "y" ] || [ "$SETUP_SNS" = "Y" ]; then
  ./setup-sns-notifications.sh
fi
echo ""

# Step 3: HTTPS Setup
echo -e "${BLUE}Step 3: Setting up HTTPS...${NC}"
read -p "Do you have a domain name? (y/n): " HAS_DOMAIN

if [ "$HAS_DOMAIN" = "y" ] || [ "$HAS_DOMAIN" = "Y" ]; then
  read -p "Enter your domain (e.g., neetmocktest.com): " DOMAIN_NAME
  read -p "Enter subdomain (default: app): " SUB_DOMAIN
  SUB_DOMAIN=${SUB_DOMAIN:-app}
  
  export DOMAIN_NAME=${DOMAIN_NAME}
  export SUB_DOMAIN=${SUB_DOMAIN}
  
  ./setup-https.sh
  echo ""
  
  # Step 4: Route 53 Setup
  echo -e "${BLUE}Step 4: Setting up Route 53...${NC}"
  ./setup-route53-domain.sh
else
  echo -e "${YELLOW}Skipping HTTPS and Route 53 setup.${NC}"
  echo -e "${YELLOW}You can run these scripts later when you have a domain.${NC}"
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Advanced Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
