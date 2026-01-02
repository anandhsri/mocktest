#!/usr/bin/env python3
"""
Alternative HTTP server that explicitly binds to the network interface
Use this if the default server.py doesn't work on your network
"""

import http.server
import socketserver
import socket
import os
import sys

PORT = 8040

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Override to show client IP addresses"""
        client_ip = self.client_address[0]
        print(f"{client_ip} - {format % args}")

def get_local_ip():
    """Get the local IP address"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "localhost"

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    local_ip = get_local_ip()
    
    # Try binding to the specific network interface IP
    try:
        print(f"Attempting to bind to {local_ip}:{PORT}...")
        httpd = socketserver.TCPServer((local_ip, PORT), MyHTTPRequestHandler)
        httpd.allow_reuse_address = True
    except OSError as e:
        print(f"Failed to bind to {local_ip}:{PORT}")
        print(f"Error: {e}")
        print(f"\nTrying to bind to 0.0.0.0:{PORT} instead...")
        httpd = socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler)
        httpd.allow_reuse_address = True
    
    print("=" * 60)
    print("NEET Mock Test Server Started!")
    print("=" * 60)
    print(f"\nLocal access:")
    print(f"  http://localhost:{PORT}")
    print(f"  http://127.0.0.1:{PORT}")
    print(f"\nNetwork access (from other devices on your network):")
    print(f"  http://{local_ip}:{PORT}")
    print(f"\nServer is listening on: {httpd.server_address}")
    print(f"\nPress Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nServer stopped.")

