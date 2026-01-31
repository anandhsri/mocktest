#!/usr/bin/env python3
"""
Simple HTTP server to run the NEET Mock Test application
Accessible on your home network
"""

import http.server
import socketserver
import socket
import os

PORT = 8040
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', 'neet-web'))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def get_local_ip():
    """Get the local IP address"""
    try:
        # Connect to a remote address to determine local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "localhost"

class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == "__main__":
    # Serve files from the static web directory
    if os.path.isdir(STATIC_DIR):
        os.chdir(STATIC_DIR)
    else:
        # Fallback: serve from the script directory
        os.chdir(BASE_DIR)
    
    local_ip = get_local_ip()
    
    with ThreadingTCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print("=" * 60)
        print("NEET Mock Test Server Started!")
        print("=" * 60)
        print(f"\nLocal access:")
        print(f"  http://localhost:{PORT}")
        print(f"\nNetwork access (from other devices on your network):")
        print(f"  http://{local_ip}:{PORT}")
        print(f"\nPress Ctrl+C to stop the server")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped.")

