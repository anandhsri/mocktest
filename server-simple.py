#!/usr/bin/env python3
"""
Simplest HTTP server - use this if others don't work
"""

import http.server
import socketserver
import os

PORT = 8040

# Change to script directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create server
Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running on port {PORT}")
        print(f"Access at: http://localhost:{PORT}")
        print(f"Or from network: http://192.168.0.113:{PORT}")
        print("Press Ctrl+C to stop")
        httpd.serve_forever()
except OSError as e:
    print(f"Error: {e}")
    print("Port might be in use. Try: lsof -ti:8040 | xargs kill -9")

