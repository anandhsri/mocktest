#!/bin/bash
# Start the NEET Mock Test server

# Make sure we're in the right directory
cd "$(dirname "$0")"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Starting server with Python 3..."
    python3 server.py
elif command -v python &> /dev/null; then
    echo "Starting server with Python..."
    python server.py
else
    echo "Error: Python is not installed. Please install Python 3."
    exit 1
fi

