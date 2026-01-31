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
import json
import threading
import sqlite3
from urllib.parse import urlparse

# Get port from environment variable or default to 8040
PORT = int(os.environ.get('PORT', 8040))
HOST = os.environ.get('HOST', '0.0.0.0')
RESULTS_DB = os.environ.get('RESULTS_DB', '/data/results.db')

_results_lock = threading.Lock()

def _ensure_results_db():
    try:
        os.makedirs(os.path.dirname(RESULTS_DB), exist_ok=True)
        conn = sqlite3.connect(RESULTS_DB, timeout=10, check_same_thread=False)
        try:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS results (
                    id TEXT PRIMARY KEY,
                    timestamp TEXT,
                    payload TEXT
                )
            """)
            conn.execute("CREATE INDEX IF NOT EXISTS idx_results_ts ON results(timestamp)")
            conn.commit()
        finally:
            conn.close()
    except Exception:
        # best-effort
        pass

def _read_results(limit=500):
    _ensure_results_db()
    try:
        conn = sqlite3.connect(RESULTS_DB, timeout=10, check_same_thread=False)
        try:
            rows = conn.execute(
                "SELECT payload FROM results ORDER BY timestamp DESC LIMIT ?",
                (int(limit),)
            ).fetchall()
        finally:
            conn.close()

        results = []
        for (payload_str,) in rows:
            try:
                results.append(json.loads(payload_str))
            except Exception:
                continue

        # Return oldest->newest for UI consistency
        results.reverse()
        return results
    except Exception:
        return []

def _upsert_result(payload):
    _ensure_results_db()
    rid = payload.get('id')
    ts = payload.get('timestamp')
    if not rid:
        return False
    if not ts:
        ts = ""
    payload_str = json.dumps(payload)

    conn = sqlite3.connect(RESULTS_DB, timeout=10, check_same_thread=False)
    try:
        conn.execute(
            "INSERT OR REPLACE INTO results (id, timestamp, payload) VALUES (?, ?, ?)",
            (str(rid), str(ts), payload_str)
        )
        # Keep last 500 rows
        conn.execute("""
            DELETE FROM results
            WHERE id NOT IN (
                SELECT id FROM results ORDER BY timestamp DESC LIMIT 500
            )
        """)
        conn.commit()
        return True
    finally:
        conn.close()

def _clear_results():
    _ensure_results_db()
    conn = sqlite3.connect(RESULTS_DB, timeout=10, check_same_thread=False)
    try:
        conn.execute("DELETE FROM results")
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def _send_json(self, status, obj):
        body = json.dumps(obj).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json_body(self):
        length = int(self.headers.get('Content-Length', '0') or '0')
        raw = self.rfile.read(length) if length > 0 else b''
        if not raw:
            return None
        try:
            return json.loads(raw.decode('utf-8'))
        except Exception:
            return None

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/results':
            with _results_lock:
                results = _read_results()
            return self._send_json(200, results)
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/results':
            payload = self._read_json_body()
            if not isinstance(payload, dict):
                return self._send_json(400, {"error": "invalid_json"})

            with _results_lock:
                ok = _upsert_result(payload)

            return self._send_json(200, {"ok": bool(ok)})
        return self._send_json(404, {"error": "not_found"})

    def do_DELETE(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/results':
            with _results_lock:
                ok = _clear_results()
            return self._send_json(200, {"ok": bool(ok)})
        return self._send_json(404, {"error": "not_found"})

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

class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    # Handle each request in a new thread to avoid one slow client
    # blocking the entire server (important for Docker healthchecks and LAN clients).
    daemon_threads = True
    allow_reuse_address = True

if __name__ == "__main__":
    # Change to the directory where this script is located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    container_info = get_container_info()
    _ensure_results_db()
    
    with ThreadingTCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
        print("=" * 60)
        print("NEET Mock Test Server - Production Mode")
        print("=" * 60)
        print(f"Port: {PORT}")
        print(f"Host: {HOST}")
        print(f"Results DB: {RESULTS_DB}")
        print(f"Container: {container_info['task_arn']}")
        print(f"Cluster: {container_info['cluster']}")
        print(f"\nServer started successfully!")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped.")
            sys.exit(0)
