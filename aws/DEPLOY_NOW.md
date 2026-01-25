# Deploy to AWS Account 8685-2239-8039

## Prerequisites Installation

### 1. Install AWS CLI

**macOS:**
```bash
brew install awscli
```

**Or download from:**
https://aws.amazon.com/cli/

**Verify:**
```bash
aws --version
```

### 2. Install Docker

**macOS:**
```bash
brew install --cask docker
# Or download Docker Desktop from: https://www.docker.com/products/docker-desktop
```

**Verify:**
```bash
docker --version
```

### 3. Configure AWS Credentials

```bash
aws configure
```

Enter:
- **AWS Access Key ID**: [Your access key]
- **AWS Secret Access Key**: [Your secret key]
- **Default region**: us-east-1 (or your preferred region)
- **Default output format**: json

**Verify your account:**
```bash
aws sts get-caller-identity
```

Should show account: 868522398039 (without dashes)

## Deployment Steps

### Step 1: Navigate to Project

```bash
cd /Users/anandsrinivasan/neet-mock-test
```

### Step 2: Set Environment Variables

```bash
export AWS_REGION=us-east-1
export AWS_ACCOUNT_ID=868522398039
export ECS_CLUSTER_NAME=neet-mock-test-cluster
export ECS_SERVICE_NAME=neet-mock-test-service
```

### Step 3: Run Deployment Script

```bash
chmod +x aws/deploy.sh
./aws/deploy.sh
```

## Manual Deployment (If Script Fails)

### Step 1: Create ECR Repository

```bash
aws ecr create-repository \
  --repository-name neet-mock-test \
  --region us-east-1 \
  --image-scanning-configuration scanOnPush=true
```

### Step 2: Login to ECR

```bash
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  868522398039.dkr.ecr.us-east-1.amazonaws.com
```

### Step 3: Build Docker Image

```bash
docker build -t neet-mock-test:latest .
```

### Step 4: Tag Image

```bash
docker tag neet-mock-test:latest \
  868522398039.dkr.ecr.us-east-1.amazonaws.com/neet-mock-test:latest
```

### Step 5: Push to ECR

```bash
docker push \
  868522398039.dkr.ecr.us-east-1.amazonaws.com/neet-mock-test:latest
```

### Step 6: Update Task Definition

Edit `aws/ecs-task-definition.json` and replace:
- `YOUR_ECR_REPO_URI` with `868522398039.dkr.ecr.us-east-1.amazonaws.com/neet-mock-test`

Then register:

```bash
aws ecs register-task-definition \
  --cli-input-json file://aws/ecs-task-definition.json \
  --region us-east-1
```

### Step 7: Create ECS Cluster

```bash
aws ecs create-cluster \
  --cluster-name neet-mock-test-cluster \
  --region us-east-1
```

### Step 8: Create ECS Service

**First, you need:**
- VPC ID
- Subnet IDs (at least 2 for high availability)
- Security Group ID (allowing port 8040)

**Then create service:**

```bash
aws ecs create-service \
  --cluster neet-mock-test-cluster \
  --service-name neet-mock-test-service \
  --task-definition neet-mock-test:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --region us-east-1
```

## Using AWS Console (Easier for First Time)

### 1. Create ECR Repository
- Go to: ECR → Repositories → Create repository
- Name: `neet-mock-test`
- Region: us-east-1

### 2. Push Docker Image
- Follow "View push commands" in ECR repository
- Run the commands shown

### 3. Create ECS Cluster
- Go to: ECS → Clusters → Create cluster
- Name: `neet-mock-test-cluster`
- Infrastructure: AWS Fargate

### 4. Create Task Definition
- Go to: ECS → Task definitions → Create new task definition
- Use the JSON from `aws/ecs-task-definition.json`
- Update image URI to: `868522398039.dkr.ecr.us-east-1.amazonaws.com/neet-mock-test:latest`

### 5. Create Service
- Go to: ECS → Clusters → neet-mock-test-cluster → Services → Create
- Task definition: Select the one you just created
- Service name: `neet-mock-test-service`
- Desired tasks: 1
- VPC: Select your VPC
- Subnets: Select at least 2 subnets
- Security group: Create new or select existing (allow port 8040)
- Auto-assign public IP: ENABLED

### 6. Access Your Application

After service is running:
- Go to: ECS → Clusters → neet-mock-test-cluster → Tasks
- Click on the running task
- Find the Public IP
- Access: `http://<PUBLIC_IP>:8040`

## Troubleshooting

### AWS CLI Not Found
```bash
# Install via Homebrew
brew install awscli

# Or download installer
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### Docker Not Found
```bash
# Install Docker Desktop
brew install --cask docker
# Then start Docker Desktop application
```

### Permission Denied
- Ensure your AWS credentials have:
  - ECR full access
  - ECS full access
  - CloudWatch Logs access

### Can't Push to ECR
- Verify you're logged in: `aws ecr get-login-password --region us-east-1`
- Check repository exists
- Verify account ID matches: 868522398039

### Service Won't Start
- Check CloudWatch Logs: `/ecs/neet-mock-test`
- Verify security group allows port 8040
- Check task definition image URI is correct
- Verify VPC and subnet configuration

## Quick Verification

```bash
# Check AWS account
aws sts get-caller-identity

# List ECR repositories
aws ecr describe-repositories --region us-east-1

# List ECS clusters
aws ecs list-clusters --region us-east-1

# Check service status
aws ecs describe-services \
  --cluster neet-mock-test-cluster \
  --services neet-mock-test-service \
  --region us-east-1
```

## Next Steps After Deployment

1. **Set up Load Balancer** (recommended for production)
2. **Configure Auto Scaling** (if needed)
3. **Set up CloudWatch Alarms** (for monitoring)
4. **Configure Custom Domain** (optional)
5. **Set up SSL/TLS** (for HTTPS)

## Support

If you encounter issues:
1. Check CloudWatch Logs
2. Review ECS service events
3. Verify security group rules
4. Check task definition configuration
