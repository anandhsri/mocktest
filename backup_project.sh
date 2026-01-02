#!/bin/bash
# Backup script for NEET Mock Test Project
# This script creates a timestamped backup of all important project files

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="neet-mock-test-backup-$TIMESTAMP"

echo "Creating backup: $BACKUP_NAME"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create timestamped backup directory
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# Copy all important files
echo "Backing up core files..."
cp app.js "$BACKUP_DIR/$BACKUP_NAME/"
cp index.html "$BACKUP_DIR/$BACKUP_NAME/"
cp questions.js "$BACKUP_DIR/$BACKUP_NAME/"
cp styles.css "$BACKUP_DIR/$BACKUP_NAME/"
cp server.py "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null
cp package.json "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null
cp README.md "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null

# Copy configuration and script files
echo "Backing up configuration files..."
cp *.sh "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null
cp *.py "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null
cp *.js "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null
cp *.md "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null

# Create archive
echo "Creating compressed archive..."
cd "$BACKUP_DIR"
tar -czf "${BACKUP_NAME}.tar.gz" "$BACKUP_NAME" 2>/dev/null || zip -r "${BACKUP_NAME}.zip" "$BACKUP_NAME" 2>/dev/null
cd ..

# Remove temporary directory
rm -rf "$BACKUP_DIR/$BACKUP_NAME"

echo "✅ Backup completed: $BACKUP_DIR/${BACKUP_NAME}.tar.gz (or .zip)"
echo "Backup location: $(pwd)/$BACKUP_DIR/${BACKUP_NAME}.tar.gz"

