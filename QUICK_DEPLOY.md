# Quick Deploy to AWS Account 8685-2239-8039

## 🚀 Fastest Way to Deploy

### Step 1: Install Prerequisites (if not installed)

```bash
# Install AWS CLI
brew install awscli

# Install Docker
brew install --cask docker
# Then start Docker Desktop
```

### Step 2: Configure AWS

```bash
aws configure
```

Enter your AWS credentials for account **868522398039**

### Step 3: Deploy

```bash
cd /Users/anandsrinivasan/neet-mock-test
./aws/deploy-with-account.sh
```

That's it! The script will:
- ✅ Build Docker image
- ✅ Push to ECR
- ✅ Create/update ECS resources
- ✅ Deploy your app

## 📋 What You'll Need

1. **AWS Access Key** for account 868522398039
2. **AWS Secret Key**
3. **VPC and Subnets** (for ECS service - can create via console)
4. **Security Group** (allowing port 8040)

## 🎯 After Deployment

1. Go to AWS Console → ECS → Clusters → neet-mock-test-cluster
2. Click on Tasks tab
3. Click on the running task
4. Copy the Public IP
5. Access: `http://<PUBLIC_IP>:8040`

## ⚠️ If Service Creation Fails

The script will create everything except the ECS service (needs VPC info).

**Create service via AWS Console:**
1. ECS → Clusters → neet-mock-test-cluster → Services → Create
2. Use the task definition created by the script
3. Select VPC, subnets, security group
4. Enable public IP

**Or see:** `aws/DEPLOY_NOW.md` for detailed steps

## 📞 Need Help?

See `aws/DEPLOY_NOW.md` for complete instructions.
