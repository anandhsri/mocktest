#!/bin/bash
# Setup Route 53 for Custom Domain Mapping

set -e

AWS_REGION="${AWS_REGION:-ap-south-2}"
ALB_NAME="neet-mock-test-alb"
DOMAIN_NAME="${DOMAIN_NAME:-}"  # e.g., "neetmocktest.com"
SUB_DOMAIN="${SUB_DOMAIN:-app}"  # e.g., "app" for app.neetmocktest.com

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Setting up Route 53 Custom Domain${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if domain name provided
if [ -z "$DOMAIN_NAME" ]; then
  echo -e "${YELLOW}Enter your domain name (e.g., neetmocktest.com):${NC}"
  read -p "Domain: " DOMAIN_NAME
  
  if [ -z "$DOMAIN_NAME" ]; then
    echo -e "${RED}Domain name is required.${NC}"
    exit 1
  fi
fi

FULL_DOMAIN="${SUB_DOMAIN}.${DOMAIN_NAME}"

echo -e "${BLUE}Domain Configuration:${NC}"
echo -e "  Root Domain: ${DOMAIN_NAME}"
echo -e "  Subdomain: ${SUB_DOMAIN}"
echo -e "  Full Domain: ${FULL_DOMAIN}"
echo ""

# Step 1: Get ALB DNS name
echo -e "${BLUE}Step 1: Getting Load Balancer DNS name...${NC}"
ALB_DNS=$(aws elbv2 describe-load-balancers \
  --names ${ALB_NAME} \
  --region ${AWS_REGION} \
  --query 'LoadBalancers[0].DNSName' \
  --output text)

ALB_HOSTED_ZONE_ID=$(aws elbv2 describe-load-balancers \
  --names ${ALB_NAME} \
  --region ${AWS_REGION} \
  --query 'LoadBalancers[0].CanonicalHostedZoneId' \
  --output text)

if [ -z "$ALB_DNS" ] || [ "$ALB_DNS" == "None" ]; then
  echo -e "${RED}Load Balancer not found.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ ALB DNS: ${ALB_DNS}${NC}"
echo -e "${GREEN}✓ ALB Hosted Zone ID: ${ALB_HOSTED_ZONE_ID}${NC}"
echo ""

# Step 2: Check if hosted zone exists
echo -e "${BLUE}Step 2: Checking Route 53 hosted zone...${NC}"
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones \
  --query "HostedZones[?Name=='${DOMAIN_NAME}.']" \
  --output text 2>/dev/null | head -1 | awk '{print $3}' | cut -d'/' -f3 || echo "")

if [ -z "$HOSTED_ZONE_ID" ]; then
  echo -e "${YELLOW}Hosted zone not found for ${DOMAIN_NAME}${NC}"
  echo -e "${YELLOW}Creating hosted zone...${NC}"
  
  HOSTED_ZONE=$(aws route53 create-hosted-zone \
    --name ${DOMAIN_NAME} \
    --caller-reference "neet-mock-test-$(date +%s)" \
    --query 'HostedZone' \
    --output json)
  
  HOSTED_ZONE_ID=$(echo $HOSTED_ZONE | jq -r '.Id' | cut -d'/' -f3)
  NS_RECORDS=$(echo $HOSTED_ZONE | jq -r '.NameServers[]')
  
  echo -e "${GREEN}✓ Hosted zone created: ${HOSTED_ZONE_ID}${NC}"
  echo ""
  echo -e "${RED}⚠️  IMPORTANT: Update your domain's nameservers!${NC}"
  echo -e "${YELLOW}Add these nameservers to your domain registrar:${NC}"
  echo "$NS_RECORDS" | while read ns; do
    echo -e "  ${ns}"
  done
  echo ""
  read -p "Press Enter after updating nameservers, or Ctrl+C to exit..."
else
  echo -e "${GREEN}✓ Hosted zone exists: ${HOSTED_ZONE_ID}${NC}"
fi
echo ""

# Step 3: Create A record (Alias to ALB)
echo -e "${BLUE}Step 3: Creating A record (Alias to ALB)...${NC}"

# Check if record already exists
EXISTING_RECORD=$(aws route53 list-resource-record-sets \
  --hosted-zone-id ${HOSTED_ZONE_ID} \
  --query "ResourceRecordSets[?Name=='${FULL_DOMAIN}.']" \
  --output json 2>/dev/null || echo "[]")

if [ "$EXISTING_RECORD" != "[]" ]; then
  echo -e "${YELLOW}Record already exists. Updating...${NC}"
  ACTION="UPSERT"
else
  echo -e "${YELLOW}Creating new record...${NC}"
  ACTION="CREATE"
fi

# Create change batch
CHANGE_BATCH=$(cat <<EOF
{
  "Changes": [{
    "Action": "${ACTION}",
    "ResourceRecordSet": {
      "Name": "${FULL_DOMAIN}",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "${ALB_HOSTED_ZONE_ID}",
        "DNSName": "${ALB_DNS}",
        "EvaluateTargetHealth": true
      }
    }
  }]
}
EOF
)

CHANGE_ID=$(aws route53 change-resource-record-sets \
  --hosted-zone-id ${HOSTED_ZONE_ID} \
  --change-batch "${CHANGE_BATCH}" \
  --query 'ChangeInfo.Id' \
  --output text | cut -d'/' -f3)

echo -e "${GREEN}✓ A record created/updated${NC}"
echo -e "${GREEN}✓ Change ID: ${CHANGE_ID}${NC}"
echo ""

# Step 4: Wait for DNS propagation
echo -e "${BLUE}Step 4: Waiting for DNS propagation...${NC}"
echo -e "${YELLOW}This may take a few minutes...${NC}"

aws route53 wait resource-record-sets-changed --id ${CHANGE_ID} 2>/dev/null || true

echo -e "${GREEN}✓ DNS change completed${NC}"
echo ""

# Step 5: Optional - Create CNAME for root domain
echo -e "${BLUE}Step 5: Root domain redirect (optional)...${NC}"
read -p "Create www.${DOMAIN_NAME} pointing to ${FULL_DOMAIN}? (y/n): " CREATE_WWW

if [ "$CREATE_WWW" = "y" ] || [ "$CREATE_WWW" = "Y" ]; then
  WWW_CHANGE_BATCH=$(cat <<EOF
{
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "www.${DOMAIN_NAME}",
      "Type": "CNAME",
      "TTL": 300,
      "ResourceRecords": [{"Value": "${FULL_DOMAIN}"}]
    }
  }]
}
EOF
)
  
  aws route53 change-resource-record-sets \
    --hosted-zone-id ${HOSTED_ZONE_ID} \
    --change-batch "${WWW_CHANGE_BATCH} > /dev/null"
  
  echo -e "${GREEN}✓ www.${DOMAIN_NAME} created${NC}"
fi
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Route 53 Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Your custom domain is now configured!${NC}"
echo ""
echo -e "${YELLOW}Access your application:${NC}"
echo -e "  https://${FULL_DOMAIN}"
if [ "$CREATE_WWW" = "y" ] || [ "$CREATE_WWW" = "Y" ]; then
  echo -e "  https://www.${DOMAIN_NAME}"
fi
echo ""
echo -e "${YELLOW}Note: DNS propagation may take 5-30 minutes${NC}"
echo -e "${YELLOW}Test with: dig ${FULL_DOMAIN} or nslookup ${FULL_DOMAIN}${NC}"
