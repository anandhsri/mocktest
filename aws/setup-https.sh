#!/bin/bash
# Setup HTTPS with ACM Certificate for Application Load Balancer

set -e

AWS_REGION="${AWS_REGION:-ap-south-2}"
ALB_NAME="neet-mock-test-alb"
DOMAIN_NAME="${DOMAIN_NAME:-}"  # Set this to your domain, e.g., "neetmocktest.com"
SUB_DOMAIN="${SUB_DOMAIN:-app}"  # e.g., "app" for app.neetmocktest.com

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Setting up HTTPS with ACM Certificate${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Get ALB ARN
echo -e "${BLUE}Step 1: Getting Load Balancer information...${NC}"
ALB_ARN=$(aws elbv2 describe-load-balancers \
  --names ${ALB_NAME} \
  --region ${AWS_REGION} \
  --query 'LoadBalancers[0].LoadBalancerArn' \
  --output text)

if [ -z "$ALB_ARN" ] || [ "$ALB_ARN" == "None" ]; then
  echo -e "${RED}Load Balancer not found. Please run setup-load-balancer.sh first.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Load Balancer: ${ALB_ARN}${NC}"
echo ""

# Step 2: Request or import certificate
echo -e "${BLUE}Step 2: Setting up SSL Certificate...${NC}"

if [ -z "$DOMAIN_NAME" ]; then
  echo -e "${YELLOW}No domain name provided.${NC}"
  echo -e "${YELLOW}Option 1: Request a public certificate (requires domain validation)${NC}"
  echo -e "${YELLOW}Option 2: Import an existing certificate${NC}"
  echo ""
  read -p "Enter your domain name (e.g., neetmocktest.com) or press Enter to skip: " DOMAIN_NAME
  
  if [ -z "$DOMAIN_NAME" ]; then
    echo -e "${YELLOW}Skipping certificate setup. You can add it later.${NC}"
    echo ""
    echo -e "${BLUE}To request a certificate later:${NC}"
    echo "aws acm request-certificate \\"
    echo "  --domain-name ${SUB_DOMAIN}.YOUR_DOMAIN.com \\"
    echo "  --validation-method DNS \\"
    echo "  --region ${AWS_REGION}"
    exit 0
  fi
fi

FULL_DOMAIN="${SUB_DOMAIN}.${DOMAIN_NAME}"

# Check if certificate already exists
CERT_ARN=$(aws acm list-certificates \
  --region ${AWS_REGION} \
  --query "CertificateSummaryList[?DomainName=='${FULL_DOMAIN}'].CertificateArn" \
  --output text 2>/dev/null || echo "")

if [ -z "$CERT_ARN" ] || [ "$CERT_ARN" == "None" ]; then
  echo -e "${YELLOW}Requesting certificate for ${FULL_DOMAIN}...${NC}"
  
  CERT_ARN=$(aws acm request-certificate \
    --domain-name ${FULL_DOMAIN} \
    --subject-alternative-names ${DOMAIN_NAME} \
    --validation-method DNS \
    --region ${AWS_REGION} \
    --query 'CertificateArn' \
    --output text)
  
  echo -e "${GREEN}✓ Certificate requested: ${CERT_ARN}${NC}"
  echo ""
  echo -e "${YELLOW}⚠️  IMPORTANT: Certificate validation required!${NC}"
  echo ""
  echo -e "${BLUE}Get validation records:${NC}"
  echo "aws acm describe-certificate \\"
  echo "  --certificate-arn ${CERT_ARN} \\"
  echo "  --region ${AWS_REGION} \\"
  echo "  --query 'Certificate.DomainValidationOptions'"
  echo ""
  echo -e "${YELLOW}You need to add DNS validation records to your domain's DNS.${NC}"
  echo -e "${YELLOW}Wait for certificate to be validated before proceeding.${NC}"
  echo ""
  read -p "Press Enter when certificate is validated, or Ctrl+C to exit..."
else
  echo -e "${GREEN}✓ Certificate exists: ${CERT_ARN}${NC}"
  
  # Check certificate status
  CERT_STATUS=$(aws acm describe-certificate \
    --certificate-arn ${CERT_ARN} \
    --region ${AWS_REGION} \
    --query 'Certificate.Status' \
    --output text)
  
  if [ "$CERT_STATUS" != "ISSUED" ]; then
    echo -e "${RED}Certificate status: ${CERT_STATUS}${NC}"
    echo -e "${YELLOW}Certificate must be ISSUED before adding to ALB.${NC}"
    exit 1
  fi
fi
echo ""

# Step 3: Get current listener
echo -e "${BLUE}Step 3: Getting current listener...${NC}"
HTTP_LISTENER_ARN=$(aws elbv2 describe-listeners \
  --load-balancer-arn ${ALB_ARN} \
  --region ${AWS_REGION} \
  --query 'Listeners[?Port==`80`].ListenerArn' \
  --output text)

echo -e "${GREEN}✓ HTTP Listener: ${HTTP_LISTENER_ARN}${NC}"
echo ""

# Step 4: Create HTTPS listener
echo -e "${BLUE}Step 4: Creating HTTPS listener...${NC}"
HTTPS_LISTENER_EXISTS=$(aws elbv2 describe-listeners \
  --load-balancer-arn ${ALB_ARN} \
  --region ${AWS_REGION} \
  --query 'Listeners[?Port==`443`].ListenerArn' \
  --output text 2>/dev/null || echo "")

if [ -z "$HTTPS_LISTENER_EXISTS" ] || [ "$HTTPS_LISTENER_EXISTS" == "None" ]; then
  # Get target group ARN
  TG_ARN=$(aws elbv2 describe-target-groups \
    --names neet-mock-test-tg \
    --region ${AWS_REGION} \
    --query 'TargetGroups[0].TargetGroupArn' \
    --output text)
  
  aws elbv2 create-listener \
    --load-balancer-arn ${ALB_ARN} \
    --protocol HTTPS \
    --port 443 \
    --certificates CertificateArn=${CERT_ARN} \
    --default-actions Type=forward,TargetGroupArn=${TG_ARN} \
    --region ${AWS_REGION} > /dev/null
  
  echo -e "${GREEN}✓ HTTPS Listener created on port 443${NC}"
else
  echo -e "${GREEN}✓ HTTPS Listener already exists${NC}"
fi
echo ""

# Step 5: Redirect HTTP to HTTPS (optional but recommended)
echo -e "${BLUE}Step 5: Setting up HTTP to HTTPS redirect...${NC}"
read -p "Redirect HTTP (port 80) to HTTPS? (y/n): " REDIRECT_HTTP

if [ "$REDIRECT_HTTP" = "y" ] || [ "$REDIRECT_HTTP" = "Y" ]; then
  # Delete existing HTTP listener
  aws elbv2 delete-listener \
    --listener-arn ${HTTP_LISTENER_ARN} \
    --region ${AWS_REGION} > /dev/null 2>&1 || true
  
  # Create new HTTP listener that redirects to HTTPS
  aws elbv2 create-listener \
    --load-balancer-arn ${ALB_ARN} \
    --protocol HTTP \
    --port 80 \
    --default-actions "Type=redirect,RedirectConfig={Protocol=HTTPS,Port=443,StatusCode=HTTP_301}" \
    --region ${AWS_REGION} > /dev/null
  
  echo -e "${GREEN}✓ HTTP to HTTPS redirect configured${NC}"
else
  echo -e "${YELLOW}HTTP listener kept as-is${NC}"
fi
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}HTTPS Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Your application now supports HTTPS!${NC}"
echo ""
echo -e "${YELLOW}Access your application:${NC}"
echo -e "  HTTP:  http://${ALB_DNS:-neet-mock-test-alb-1894032504.ap-south-2.elb.amazonaws.com}"
echo -e "  HTTPS: https://${ALB_DNS:-neet-mock-test-alb-1894032504.ap-south-2.elb.amazonaws.com}"
echo ""
if [ -n "$DOMAIN_NAME" ]; then
  echo -e "${YELLOW}With custom domain:${NC}"
  echo -e "  HTTPS: https://${FULL_DOMAIN}"
  echo ""
  echo -e "${BLUE}Next: Set up Route 53 to map ${FULL_DOMAIN} to the ALB${NC}"
fi
