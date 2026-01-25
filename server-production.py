#!/usr/bin/env python3
"""
Production HTTP server for NEET Mock Test application
Optimized for AWS container deployment
"""

import http.server
import socketserver
import socket
import os
import sys

# Get port from environment variable or default to 8040
PORT = int(os.environ.get('PORT', 8040))
HOST = os.environ.get('HOST', '0.0.0.0')

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Security headers
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging for production
        sys.stderr.write("%s - - [%s] %s\n" %
                        (self.address_string(),
                         self.log_date_time_string(),
                         format%args))

def get_container_info():
    """Get container information for logging"""
    try:
        # Try to get container ID from AWS ECS metadata
        import urllib.request
        metadata_url = os.environ.get('ECS_CONTAINER_METADATA_URI_V4', '')
        if metadata_url:
            with urllib.request.urlopen(f"{metadata_url}/task") as response:
                import json
                metadata = json.loads(response.read())
                return {
                    'task_arn': metadata.get('TaskARN', 'N/A'),
                    'cluster': metadata.get('Cluster', 'N/A')
                }
    except Exception:
        pass
    return {'task_arn': 'N/A', 'cluster': 'N/A'}

if __name__ == "__main__":
    # Change to the directory where this script is located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    container_info = get_container_info()
    
    with socketserver.TCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
        print("=" * 60)
        print("NEET Mock Test Server - Production Mode")
        print("=" * 60)
        print(f"Port: {PORT}")
        print(f"Host: {HOST}")
        print(f"Container: {container_info['task_arn']}")
        print(f"Cluster: {container_info['cluster']}")
        print(f"\nServer started successfully!")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped.")
            sys.exit(0)
