# Firewall Setup for Network Access

If `http://localhost:8040` works but `http://192.168.0.113:8040` doesn't work from other devices, you need to allow Python through the macOS firewall.

## Method 1: System Settings (Recommended)

1. Open **System Settings** (or **System Preferences** on older macOS)
2. Go to **Network** → **Firewall** (or **Security & Privacy** → **Firewall**)
3. Click **Options** or the lock icon (enter your password)
4. Look for **Python** or **python3** in the list
5. If it's there, make sure it's set to **Allow incoming connections**
6. If it's not there:
   - Click the **+** button
   - Navigate to `/usr/bin/python3` or `/usr/local/bin/python3`
   - Add it and set to **Allow incoming connections**

## Method 2: Terminal (if you have admin rights)

```bash
# Allow Python through firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/bin/python3
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblockapp /usr/bin/python3
```

## Method 3: Temporarily Disable Firewall (Not Recommended)

1. System Settings → Network → Firewall
2. Turn off firewall temporarily
3. Test network access
4. Turn firewall back on and use Method 1

## Verify Server is Running

The server should be listening on all interfaces. Check with:
```bash
netstat -an | grep 8040
```

You should see `*.8040` in the output, which means it's listening on all network interfaces.

## Test from Another Device

1. Make sure both devices are on the same Wi-Fi network
2. From the other device, open a browser
3. Go to: `http://192.168.0.113:8040`
4. If it still doesn't work, check:
   - Both devices are on the same network
   - No VPN is active that might block local network access
   - Router doesn't have AP isolation enabled

