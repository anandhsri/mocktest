# AWS Container Deployment Guide

This guide will help you deploy the NEET Mock Test application to AWS using ECS (Elastic Container Service) with Fargate.

## Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws --version
   aws configure
   ```

2. **Docker** installed
   ```bash
   docker --version
   ```

3. **AWS Account** with appropriate permissions:
   - ECR (Elastic Container Registry) access
   - ECS (Elastic Container Service) access
   - CloudWatch Logs access
   - VPC and Security Group access

## Quick Start

### Option 1: Automated Deployment (Recommended)

1. **Make deployment script executable:**
   ```bash
   chmod +x aws/deploy.sh
   ```

2. **Set environment variables (optional):**
   ```bash
   export AWS_REGION=us-east-1
   export ECS_CLUSTER_NAME=neet-mock-test-cluster
   export ECS_SERVICE_NAME=neet-mock-test-service
   ```

3. **Run deployment:**
   ```bash
   ./aws/deploy.sh
   ```

### Option 2: Manual Deployment

#### Step 1: Create ECR Repository

```bash
aws ecr create-repository --repository-name neet-mock-test --region us-east-1
```

#### Step 2: Build and Push Docker Image

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t neet-mock-test:latest .

# Tag image
docker tag neet-mock-test:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/neet-mock-test:latest

# Push image
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/neet-mock-test:latest
```

#### Step 3: Create ECS Cluster

```bash
aws ecs create-cluster --cluster-name neet-mock-test-cluster --region us-east-1
```

#### Step 4: Register Task Definition

1. Update `ecs-task-definition.json` with your ECR repository URI
2. Register the task definition:
   ```bash
   aws ecs register-task-definition --cli-input-json file://aws/ecs-task-definition.json --region us-east-1
   ```

#### Step 5: Create ECS Service

You can create the service via AWS Console or CLI. The service needs:
- Cluster name
- Task definition
- VPC and subnets
- Security group (allow inbound on port 8040)
- Load balancer (optional, recommended for production)

## Configuration

### Environment Variables

The container supports the following environment variables:

- `PORT`: Server port (default: 8040)
- `HOST`: Bind address (default: 0.0.0.0)

### Task Definition Settings

Current configuration:
- **CPU**: 256 (0.25 vCPU)
- **Memory**: 512 MB
- **Network Mode**: awsvpc (Fargate)
- **Port**: 8040

For production, consider:
- Increasing CPU to 512 or 1024
- Increasing memory to 1024 MB
- Adding a load balancer
- Setting up auto-scaling

## Security

### Security Group Rules

Your security group should allow:
- **Inbound**: Port 8040 from your IP or load balancer
- **Outbound**: All traffic (for health checks)

### IAM Roles

Ensure your ECS task has:
- CloudWatch Logs write permissions
- ECR pull permissions (if using private registry)

## Monitoring

### CloudWatch Logs

Logs are automatically sent to CloudWatch:
- Log Group: `/ecs/neet-mock-test`
- Stream Prefix: `ecs`

### Health Checks

The container includes a health check that:
- Runs every 30 seconds
- Checks HTTP endpoint on port 8040
- Retries 3 times before marking unhealthy

## Troubleshooting

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

### Check Task Status

```bash
aws ecs list-tasks \
  --cluster neet-mock-test-cluster \
  --service-name neet-mock-test-service \
  --region us-east-1
```

## Cost Estimation

Approximate monthly costs (us-east-1):
- **Fargate**: ~$7-15/month (0.25 vCPU, 0.5 GB, running 24/7)
- **ECR**: ~$0.10/month (storage)
- **CloudWatch Logs**: ~$0.50/month (first 5 GB free)
- **Data Transfer**: Varies

**Total**: ~$8-16/month for basic setup

## Local Testing

Before deploying to AWS, test locally with Docker:

```bash
# Build image
docker build -t neet-mock-test:local .

# Run container
docker run -p 8040:8040 -e PORT=8040 neet-mock-test:local

# Or use docker-compose
docker-compose up
```

## Updating the Application

To update the application:

1. Make your changes
2. Run the deployment script again:
   ```bash
   ./aws/deploy.sh
   ```

The script will:
- Build a new Docker image
- Push it to ECR
- Update the ECS task definition
- Force a new deployment of the service

## Production Recommendations

1. **Use Application Load Balancer** for:
   - SSL/TLS termination
   - Health checks
   - Multiple availability zones

2. **Set up Auto Scaling** based on:
   - CPU utilization
   - Memory utilization
   - Request count

3. **Enable CloudWatch Alarms** for:
   - High error rates
   - High latency
   - Service health

4. **Use AWS Secrets Manager** for:
   - API keys
   - Database credentials
   - Other sensitive data

5. **Set up CI/CD** with:
   - GitHub Actions
   - AWS CodePipeline
   - GitLab CI/CD

## Support

For issues or questions:
1. Check CloudWatch Logs
2. Review ECS service events
3. Verify security group rules
4. Check task definition configuration
