# Fix Network Access - Firewall Configuration

## Problem
The macOS firewall is blocking incoming connections to port 8040.

## Solution: Allow Python Through Firewall

### Method 1: System Settings (Recommended)

1. **Open System Settings**
   - Click Apple menu → System Settings
   - Or press `Cmd + Space` and search "System Settings"

2. **Navigate to Firewall**
   - Go to **Network** → **Firewall**
   - Click the **Options...** button (you may need to unlock with your password)

3. **Add Python to Allowed Apps**
   - Click the **+** button
   - Navigate to: `/opt/homebrew/Cellar/python@3.14/3.14.0_1/Frameworks/Python.framework/Versions/3.14/Resources/Python.app`
   - Or search for "Python" in Applications
   - Select it and click **Add**
   - Make sure it's set to **Allow incoming connections**

4. **Restart the Server**
   - Stop the current server (if running)
   - Start it again: `python3 server.py`

### Method 2: Command Line (Requires Admin Password)

Run this command in Terminal (you'll be prompted for your password):

```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /opt/homebrew/Cellar/python@3.14/3.14.0_1/Frameworks/Python.framework/Versions/3.14/Resources/Python.app
sudo /usr/libexec/ApplicationFirewall/socketfilxterfw --unblockapp /opt/homebrew/Cellar/python@3.14/3.14.0_1/Frameworks/Python.framework/Versions/3.14/Resources/Python.app
```

### Method 3: Temporarily Disable Firewall (For Testing Only)

1. Go to **System Settings** → **Network** → **Firewall**
2. Toggle **Firewall** to **Off**
3. **Test the connection** from another device
4. **Re-enable the firewall** after testing

## Verify the Fix

After allowing Python through the firewall:

1. **Test locally first:**
   ```bash
   curl http://localhost:8040
   ```

2. **Test from network IP:**
   ```bash
   curl http://192.168.0.203:8040
   ```

3. **Access from another device:**
   - Open browser on another device on the same network
   - Go to: `http://192.168.0.203:8040`

## Current Network Information

- **Your IP Address:** 192.168.0.203
- **Port:** 8040
- **Network URL:** http://192.168.0.203:8040

## Troubleshooting

If still not working:

1. **Check if both devices are on the same network**
   - Both must be connected to the same Wi-Fi

2. **Verify server is running:**
   ```bash
   lsof -ti:8040
   ```

3. **Check server is binding correctly:**
   ```bash
   netstat -an | grep 8040
   ```
   Should show: `*.8040` (listening on all interfaces)

4. **Try restarting the server:**
   ```bash
   # Kill existing server
   lsof -ti:8040 | xargs kill
   # Start fresh
   python3 server.py
   ```



