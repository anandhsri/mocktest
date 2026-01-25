# Application Load Balancer Setup

## ✅ Load Balancer Created

Your application now has a **stable, permanent URL** that won't change!

## 🔗 Application URL

**Stable URL:** http://neet-mock-test-alb-1894032504.ap-south-2.elb.amazonaws.com

**Short URL:** https://tinyurl.com/2a8kzq5d

## 📋 Load Balancer Details

- **Name:** neet-mock-test-alb
- **DNS Name:** neet-mock-test-alb-1894032504.ap-south-2.elb.amazonaws.com
- **Type:** Application Load Balancer (ALB)
- **Scheme:** Internet-facing
- **Protocol:** HTTP (Port 80)
- **Target Group:** neet-mock-test-tg
- **Target Port:** 8040

## 🎯 Benefits

1. **Stable URL** - Never changes, even when tasks restart
2. **High Availability** - Distributes traffic across multiple tasks
3. **Health Checks** - Automatically removes unhealthy targets
4. **SSL/TLS Ready** - Easy to add HTTPS certificate
5. **Custom Domain** - Can map to your own domain name

## 🔧 Next Steps (Optional)

### 1. Add HTTPS (Recommended)

To enable HTTPS, you'll need:
- An SSL certificate from AWS Certificate Manager (ACM)
- Update the listener to use HTTPS (port 443)

### 2. Custom Domain Name

You can map a custom domain using Route 53:
1. Create a hosted zone in Route 53
2. Create an A record pointing to the ALB
3. Update DNS settings with your domain registrar

### 3. Update ECS Service

The service has been automatically updated to use the load balancer. Tasks will register themselves automatically.

## 📊 Monitoring

**View ALB metrics:**
https://ap-south-2.console.aws.amazon.com/ec2/v2/home?region=ap-south-2#LoadBalancers:search=neet-mock-test-alb

**View Target Group health:**
https://ap-south-2.console.aws.amazon.com/ec2/v2/home?region=ap-south-2#TargetGroups:search=neet-mock-test-tg

## 🔄 Update Service

If you need to update the service:
```bash
cd /Users/anandsrinivasan/neet-mock-test
./aws/deploy-with-account.sh
```

The load balancer will automatically route traffic to new tasks.

## 💰 Cost Estimate

- **ALB:** ~$16/month (base cost)
- **LCU (Load Balancer Capacity Units):** ~$0.008 per LCU-hour
- **Data Transfer:** Varies

**Total:** ~$16-20/month for ALB

## ✅ Status

Your application is now accessible via a stable URL that won't change!
