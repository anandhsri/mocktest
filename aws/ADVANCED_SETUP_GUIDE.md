# Advanced Setup Guide: HTTPS, Custom Domain, and Monitoring

## ✅ Completed: CloudWatch Alarms

6 CloudWatch alarms have been created to monitor your application:
1. **High HTTP 5xx Error Rate** - Alerts when server errors occur
2. **High Response Time** - Alerts when response time > 2 seconds
3. **Unhealthy Targets** - Alerts when targets become unhealthy
4. **High CPU Utilization** - Alerts when CPU > 80%
5. **High Memory Utilization** - Alerts when memory > 80%
6. **High Request Count** - Alerts when traffic is high (for scaling)

**View Alarms:**
https://ap-south-2.console.aws.amazon.com/cloudwatch/home?region=ap-south-2#alarmsV2:

## 📧 Email Notifications (SNS)

To receive email alerts when alarms trigger:

```bash
cd /Users/anandsrinivasan/neet-mock-test/aws
./setup-sns-notifications.sh
```

Enter your email when prompted. You'll receive a confirmation email - **click the confirmation link** to activate notifications.

## 🔒 HTTPS Setup

### Option 1: With Your Own Domain

If you have a domain name (e.g., neetmocktest.com):

```bash
cd /Users/anandsrinivasan/neet-mock-test/aws
export DOMAIN_NAME="yourdomain.com"
export SUB_DOMAIN="app"  # Optional, defaults to "app"
./setup-https.sh
```

**Steps:**
1. Script requests SSL certificate from ACM
2. You'll get DNS validation records
3. Add these records to your domain's DNS
4. Wait for certificate validation (5-30 minutes)
5. HTTPS listener is created on port 443
6. Optional: HTTP to HTTPS redirect

### Option 2: Without Domain (ALB DNS only)

You can still use HTTPS with the ALB DNS name, but you'll need to:
1. Request a certificate for the ALB DNS name (not recommended)
2. Or use a free domain service

**Recommended:** Get a domain from Route 53 or another registrar first.

## 🌐 Custom Domain Setup (Route 53)

### Prerequisites
- Domain registered (Route 53 or external registrar)
- SSL certificate validated (from HTTPS setup)

### Setup Steps

```bash
cd /Users/anandsrinivasan/neet-mock-test/aws
export DOMAIN_NAME="yourdomain.com"
export SUB_DOMAIN="app"
./setup-route53-domain.sh
```

**What it does:**
1. Creates or finds Route 53 hosted zone
2. Creates A record (Alias) pointing to your ALB
3. Optionally creates www subdomain
4. Configures DNS propagation

**If domain is registered elsewhere:**
1. Get nameservers from Route 53 hosted zone
2. Update nameservers at your domain registrar
3. Wait for DNS propagation (up to 48 hours, usually < 1 hour)

## 🚀 Quick Setup (All at Once)

Run the complete setup script:

```bash
cd /Users/anandsrinivasan/neet-mock-test/aws
./setup-all-advanced.sh
```

This will:
1. ✅ Set up CloudWatch alarms (already done)
2. Optionally set up SNS notifications
3. Optionally set up HTTPS (if you have a domain)
4. Optionally set up Route 53 (if you have a domain)

## 📋 Current Status

### ✅ Completed
- Application Load Balancer with stable URL
- CloudWatch Alarms (6 alarms)
- ECS Service running and healthy

### ⏳ Pending (Optional)
- HTTPS/SSL Certificate (requires domain)
- Custom Domain (requires domain)
- SNS Email Notifications (run setup-sns-notifications.sh)

## 🔗 Current Access

**Stable ALB URL:**
http://neet-mock-test-alb-1894032504.ap-south-2.elb.amazonaws.com

**TinyURL:**
https://tinyurl.com/23sjhfyg

## 📊 Monitoring Dashboard

**CloudWatch Alarms:**
https://ap-south-2.console.aws.amazon.com/cloudwatch/home?region=ap-south-2#alarmsV2:

**ALB Metrics:**
https://ap-south-2.console.aws.amazon.com/ec2/v2/home?region=ap-south-2#LoadBalancers:search=neet-mock-test-alb

**ECS Service:**
https://ap-south-2.console.aws.amazon.com/ecs/v2/clusters/neet-mock-test-cluster/services/neet-mock-test-service

## 💡 Tips

### For HTTPS without Domain
- Consider using a free subdomain service
- Or use AWS Certificate Manager with a Route 53 domain

### For Custom Domain
- Route 53 domains: $12-15/year
- External domains: Update nameservers to Route 53
- DNS propagation: Usually 5-30 minutes

### For Monitoring
- Set up SNS for email alerts
- Create CloudWatch dashboards for visualization
- Set up auto-scaling based on alarms

## 🆘 Troubleshooting

### Certificate Not Validating
- Check DNS records are correct
- Wait up to 30 minutes for propagation
- Verify domain ownership

### Domain Not Resolving
- Check nameservers are updated
- Wait for DNS propagation
- Verify Route 53 hosted zone

### Alarms Not Triggering
- Check alarm thresholds
- Verify metrics are being collected
- Check SNS subscription is confirmed

## 📞 Next Steps

1. **Set up email notifications:**
   ```bash
   ./setup-sns-notifications.sh
   ```

2. **If you have a domain, set up HTTPS:**
   ```bash
   export DOMAIN_NAME="yourdomain.com"
   ./setup-https.sh
   ```

3. **Then set up Route 53:**
   ```bash
   ./setup-route53-domain.sh
   ```

Your application is fully monitored and ready for production! 🎉
