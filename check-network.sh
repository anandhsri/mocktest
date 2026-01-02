#!/bin/bash
# Network connectivity diagnostic script

echo "=== Network Diagnostics ==="
echo ""

echo "1. Server Status:"
lsof -ti:8040 > /dev/null 2>&1 && echo "   ✓ Server is running on port 8040" || echo "   ✗ Server is NOT running"
echo ""

echo "2. Server Listening:"
netstat -an | grep 8040 | grep LISTEN && echo "   ✓ Server is listening" || echo "   ✗ Server is NOT listening"
echo ""

echo "3. Local IP Address:"
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "Not found")
echo "   Your IP: $LOCAL_IP"
echo ""

echo "4. Localhost Test:"
curl -s -o /dev/null -w "   HTTP Status: %{http_code}\n" http://localhost:8040
echo ""

echo "5. Network IP Test:"
curl -s -o /dev/null -w "   HTTP Status: %{http_code}\n" --connect-timeout 3 http://$LOCAL_IP:8040 2>&1 | tail -1
echo ""

echo "6. Firewall Status:"
/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
echo ""

echo "7. Network Interfaces:"
ifconfig | grep -A 1 "inet " | grep -v "127.0.0.1"
echo ""

echo "=== Recommendations ==="
echo ""
echo "If localhost works but network IP doesn't:"
echo "1. Check router AP Isolation settings (disable it)"
echo "2. Verify both devices are on the same Wi-Fi network"
echo "3. Try accessing from another device: http://$LOCAL_IP:8040"
echo "4. Check if VPN is active (disconnect if so)"
echo "5. Try a different port (edit server.py and change PORT)"

