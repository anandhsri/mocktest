# AWS Resources Created - ap-south-2

## 📋 Resource Summary

All resources have been created in **ap-south-2** (Asia Pacific - Hyderabad) region.

## 🔗 Direct Console Links

### ECS (Elastic Container Service)

**Cluster:**
- Name: `neet-mock-test-cluster`
- Console: https://ap-south-2.console.aws.amazon.com/ecs/v2/clusters/neet-mock-test-cluster

**Service:**
- Name: `neet-mock-test-service`
- Console: https://ap-south-2.console.aws.amazon.com/ecs/v2/clusters/neet-mock-test-cluster/services/neet-mock-test-service

**Task Definition:**
- Name: `neet-mock-test`
- Console: https://ap-south-2.console.aws.amazon.com/ecs/v2/task-definitions/neet-mock-test

**Running Tasks:**
- Console: https://ap-south-2.console.aws.amazon.com/ecs/v2/clusters/neet-mock-test-cluster/tasks

### ECR (Elastic Container Registry)

**Repository:**
- Name: `neet-mock-test`
- Console: https://ap-south-2.console.aws.amazon.com/ecr/repositories/private/868522398039/neet-mock-test

### CloudWatch Logs

**Log Group:**
- Name: `/ecs/neet-mock-test`
- Console: https://ap-south-2.console.aws.amazon.com/cloudwatch/home?region=ap-south-2#logsV2:log-groups/log-group/$252Fecs$252Fneet-mock-test

### EC2 (Security Group)

**Security Group:**
- Name: `neet-mock-test-sg`
- Console: https://ap-south-2.console.aws.amazon.com/ec2/v2/home?region=ap-south-2#SecurityGroups:search=neet-mock-test-sg

### IAM Roles

**Execution Role:**
- Name: `ecsTaskExecutionRole`
- Console: https://console.aws.amazon.com/iam/home#/roles/ecsTaskExecutionRole

**Task Role:**
- Name: `ecsTaskRole`
- Console: https://console.aws.amazon.com/iam/home#/roles/ecsTaskRole

## 📊 Resource Details

### Application Information
- **Public IP:** `18.61.31.191`
- **URL:** http://18.61.31.191:8040
- **Port:** 8040
- **Status:** ACTIVE and Running

### Task Configuration
- **CPU:** 256 (0.25 vCPU)
- **Memory:** 512 MB
- **Launch Type:** Fargate
- **Platform:** Linux/AMD64

### Network Configuration
- **VPC:** vpc-0df72eaa52878a043 (Default VPC)
- **Subnets:** 
  - subnet-0a626a8e0d14a34b9
  - subnet-0bb3a5794167aea06
- **Security Group:** sg-02091e1e3f612b83c
- **Public IP:** Enabled

## 🎯 Quick Actions

### View Service Status
```bash
cd /Users/anandsrinivasan/neet-mock-test
AWS_REGION=ap-south-2 ./aws/get-service-info.sh
```

### View Logs
```bash
aws logs tail /ecs/neet-mock-test --follow --region ap-south-2
```

### Update Deployment
```bash
NEW_REGION=ap-south-2 ./aws/migrate-to-region.sh
```

## 📝 Notes

- All resources are in **ap-south-2** region
- The application is accessible at: http://18.61.31.191:8040
- Resources in **us-east-1** have been deleted
- IAM roles are global (not region-specific)
