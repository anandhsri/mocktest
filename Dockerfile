# Multi-stage Dockerfile for NEET Mock Test Application
FROM python:3.11-slim AS base

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy core application files
COPY index.html app.js questions.js styles.css ./

# Copy server files
COPY server.py server-production.py ./

# Expose port (default 8040, can be overridden via env)
EXPOSE 8040

# Health check (using Python since curl may not be available)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:8040/')" || exit 1

# Use production server by default
CMD ["python3", "server-production.py"]
