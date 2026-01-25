# AWS Container Deployment - Quick Start

Your NEET Mock Test application is now ready for AWS container deployment!

## 📦 What's Been Created

1. **Dockerfile** - Containerizes your application
2. **server-production.py** - Production-optimized server with security headers
3. **docker-compose.yml** - For local testing
4. **AWS ECS Task Definition** - Ready-to-use ECS configuration
5. **Deployment Script** - Automated deployment to AWS
6. **Complete Documentation** - Step-by-step guide

## 🚀 Quick Deployment Steps

### 1. Prerequisites Check

```bash
# Check AWS CLI
aws --version

# Check Docker
docker --version

# Configure AWS (if not already done)
aws configure
```

### 2. Test Locally First

```bash
# Build and test the Docker image locally
docker build -t neet-mock-test:test .
docker run -p 8040:8040 neet-mock-test:test

# Or use docker-compose
docker-compose up
```

Visit `http://localhost:8040` to verify it works.

### 3. Deploy to AWS

```bash
# Make script executable (if not already)
chmod +x aws/deploy.sh

# Set your AWS region (optional)
export AWS_REGION=us-east-1

# Run deployment
./aws/deploy.sh
```

The script will:
- ✅ Create ECR repository (if needed)
- ✅ Build Docker image
- ✅ Push to AWS ECR
- ✅ Register ECS task definition
- ✅ Update ECS service (if exists)

### 4. Create ECS Service (First Time Only)

If this is your first deployment, you'll need to create the ECS service:

**Option A: AWS Console**
1. Go to ECS → Clusters
2. Create cluster (Fargate)
3. Create service using the registered task definition
4. Configure VPC, subnets, and security group

**Option B: AWS CLI**
```bash
aws ecs create-service \
  --cluster neet-mock-test-cluster \
  --service-name neet-mock-test-service \
  --task-definition neet-mock-test \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --region us-east-1
```

## 📋 Configuration

### Environment Variables

The container uses these environment variables:
- `PORT` - Server port (default: 8040)
- `HOST` - Bind address (default: 0.0.0.0)

### Resource Requirements

Current settings (can be adjusted in `aws/ecs-task-definition.json`):
- **CPU**: 256 (0.25 vCPU) - Good for light traffic
- **Memory**: 512 MB - Sufficient for the app
- **Port**: 8040

For production with more traffic:
- Increase CPU to 512 or 1024
- Increase memory to 1024 MB

## 🔒 Security Setup

### Security Group Rules

Create/update security group to allow:
- **Inbound**: Port 8040 from your IP or load balancer
- **Outbound**: All traffic (for health checks)

### IAM Permissions

Your AWS user/role needs:
- `ecr:*` (or specific ECR permissions)
- `ecs:*` (or specific ECS permissions)
- `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents`

## 📊 Monitoring

### View Logs

```bash
aws logs tail /ecs/neet-mock-test --follow --region us-east-1
```

### Check Service Status

```bash
aws ecs describe-services \
  --cluster neet-mock-test-cluster \
  --services neet-mock-test-service \
  --region us-east-1
```

## 💰 Cost Estimate

Approximate monthly costs:
- **Fargate**: ~$7-15/month (0.25 vCPU, 0.5 GB, 24/7)
- **ECR**: ~$0.10/month (storage)
- **CloudWatch Logs**: ~$0.50/month
- **Data Transfer**: Varies

**Total**: ~$8-16/month for basic setup

## 🔄 Updating the Application

To update after making changes:

```bash
# Just run the deployment script again
./aws/deploy.sh
```

It will automatically:
1. Build new image
2. Push to ECR
3. Update task definition
4. Deploy new version

## 📚 Full Documentation

For detailed information, see:
- `aws/README.md` - Complete deployment guide
- `aws/ecs-task-definition.json` - Task definition details
- `Dockerfile` - Container configuration

## 🆘 Troubleshooting

### Image won't build
- Check Docker is running
- Verify all files are present

### Can't push to ECR
- Verify AWS credentials: `aws sts get-caller-identity`
- Check ECR repository exists
- Verify IAM permissions

### Service won't start
- Check CloudWatch Logs
- Verify security group allows port 8040
- Check task definition configuration
- Verify VPC and subnet configuration

### Can't access application
- Check security group inbound rules
- Verify service is running: `aws ecs describe-services`
- Check load balancer (if using one)

## ✅ Next Steps

1. **Test locally** with Docker
2. **Deploy to AWS** using the script
3. **Set up load balancer** (recommended for production)
4. **Configure auto-scaling** (if needed)
5. **Set up monitoring** with CloudWatch alarms

## 📞 Support

For detailed help:
- See `aws/README.md` for comprehensive guide
- Check AWS ECS documentation
- Review CloudWatch logs for errors

---

**Your application is containerized and ready for AWS! 🎉**
