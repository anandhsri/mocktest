# Network Access Troubleshooting

If `http://localhost:8040` works but `http://192.168.0.113:8040` doesn't work from other devices, try these steps:

## 1. Verify Server is Running
```bash
netstat -an | grep 8040
```
Should show: `*.8040` or `192.168.0.113.8040`

## 2. Test from Same Computer
```bash
curl http://192.168.0.113:8040
```
If this works, the server is fine. The issue is network-related.

## 3. Check Firewall (macOS)
- System Settings → Network → Firewall → Options
- Make sure Python/python3 is set to **Allow incoming connections**
- If not listed, add `/usr/bin/python3` or `/usr/local/bin/python3`

## 4. Check Router Settings
- **AP Isolation / Client Isolation**: Disable this in your router settings
- This feature prevents devices on the same network from communicating
- Look for: "AP Isolation", "Client Isolation", "Wireless Isolation"

## 5. Check VPN
- If you have a VPN active, it might be blocking local network access
- Disconnect VPN and try again

## 6. Try Alternative Server
If the default server doesn't work, try the alternative:
```bash
python3 server-alt.py
```

## 7. Verify Both Devices on Same Network
- Both devices must be on the **same Wi-Fi network**
- Check IP addresses:
  - Server device: `192.168.0.113`
  - Client device: Should be `192.168.0.x` (same subnet)

## 8. Test with Different Port
If port 8040 is blocked, try a different port:
- Edit `server.py` and change `PORT = 8040` to `PORT = 8080`
- Restart server

## 9. Check macOS Firewall Logs
```bash
sudo log show --predicate 'process == "socketfilterfw"' --last 5m
```

## 10. Try from Command Line on Another Device
From another device on the network:
```bash
# Test connectivity
ping 192.168.0.113

# Test HTTP
curl http://192.168.0.113:8040
```

## Common Issues

### "Connection Refused"
- Server not running
- Firewall blocking
- Wrong IP address

### "Connection Timeout"
- AP Isolation enabled on router
- VPN blocking local network
- Devices on different networks

### "This site can't be reached"
- Wrong IP address
- Server not running
- Network connectivity issue

