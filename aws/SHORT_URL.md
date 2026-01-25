# Short URL for NEET Mock Test Application

## 🔗 TinyURL Created

**Current Short URL:** https://tinyurl.com/2a8kzq5d

**Current URL:** http://40.192.11.108:8040

**Previous URLs (expired):**
- http://98.130.116.223:8040
- http://18.61.31.191:8040

## 📋 Details

- **Service:** NEET Mock Test Application
- **Region:** ap-south-2 (Hyderabad)
- **Current Public IP:** 40.192.11.108 (Note: IP changes when task restarts)
- **Port:** 8040

## ✅ Usage

You can now share this short URL with others:
- https://tinyurl.com/2a8kzq5d

**Note:** Since the ALB was deleted, the IP will change when tasks restart. Use the script to get the current URL:
```bash
cd /Users/anandsrinivasan/neet-mock-test/aws
./get-current-url.sh
```

The link will redirect to your application running on AWS ECS.

## 🔄 Update Short URL

If your IP changes, you can create a new TinyURL:
```bash
curl "http://tinyurl.com/api-create.php?url=http://YOUR_NEW_IP:8040"
```

Or visit: https://tinyurl.com/app

## 📝 Note

- The short URL will work as long as your service is running
- If the IP address changes, you'll need to create a new short URL
- Consider setting up a load balancer with a stable domain name for production use
