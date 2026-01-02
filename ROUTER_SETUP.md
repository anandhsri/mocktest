# Router AP Isolation Settings Guide

## Find Your Router's IP Address

Your router's IP address (gateway) is typically:
- **192.168.0.1** (most common)
- **192.168.1.1**
- **10.0.0.1**

To find it, run:
```bash
netstat -nr | grep default
```

## How to Check/Disable AP Isolation

### Step 1: Access Router Admin Panel
1. Open a web browser
2. Go to your router's IP address (e.g., `http://192.168.0.1`)
3. Log in with admin credentials
   - Default username is often: `admin`
   - Default password is often: `admin`, `password`, or `1234`
   - Check router label for default credentials

### Step 2: Find AP Isolation Settings

The location varies by router brand:

#### **TP-Link Routers**
- Go to: **Wireless** → **Wireless Advanced Settings**
- Look for: **"AP Isolation"** or **"Enable AP Isolation"**
- **Disable** it

#### **Netgear Routers**
- Go to: **Advanced** → **Wireless Settings** → **Wireless AP**
- Look for: **"Enable AP Isolation"** or **"AP Mode"**
- **Disable** it

#### **Linksys Routers**
- Go to: **Wireless** → **Wireless Security** or **Advanced Wireless Settings**
- Look for: **"AP Isolation"** or **"Wireless Isolation"**
- **Disable** it

#### **ASUS Routers**
- Go to: **Wireless** → **Professional** or **Advanced Settings**
- Look for: **"AP Isolation"** or **"Client Isolation"**
- **Disable** it

#### **D-Link Routers**
- Go to: **Setup** → **Wireless Settings** → **Advanced**
- Look for: **"AP Isolation"** or **"Station Isolation"**
- **Disable** it

#### **Apple AirPort/Time Capsule**
- Open **AirPort Utility**
- Select your base station
- Click **Edit**
- Go to **Wireless** tab
- Look for **"Create a closed network"** or isolation settings
- **Disable** isolation

#### **Google Nest/Google WiFi**
- Open **Google Home** app
- Go to **Wi‑Fi** → **Settings** → **Advanced networking**
- Look for **"AP Isolation"** or **"Client Isolation"**
- **Disable** it

### Step 3: Save and Apply
- Click **Save** or **Apply**
- Router may restart (wait 1-2 minutes)
- Try accessing `http://192.168.0.113:8040` again

## Alternative Names for AP Isolation

The setting might be called:
- **AP Isolation**
- **Client Isolation**
- **Wireless Isolation**
- **Station Isolation**
- **AP Mode**
- **Guest Network Isolation** (if using guest network)

## If You Can't Find AP Isolation

1. **Check Guest Network Settings**
   - If devices are on a guest network, they may be isolated
   - Connect all devices to the main network

2. **Check Router Firmware**
   - Some routers hide this setting
   - Update router firmware
   - Check router manufacturer's support site

3. **Contact Router Support**
   - Some ISPs lock router settings
   - Contact your internet provider

## Verify Settings Changed

After disabling AP Isolation:
1. Wait 2-3 minutes for router to apply changes
2. Restart your server: `./start-server.sh`
3. Try accessing from another device: `http://192.168.0.113:8040`

## Security Note

AP Isolation is a security feature that prevents devices from communicating. Disabling it allows devices on your network to communicate, which is necessary for your server but means devices can see each other. This is normal for a home network.

