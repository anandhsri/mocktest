#!/bin/bash
# Setup script to schedule daily question refresh at 1 AM
# Creates a launchd plist for macOS

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLIST_NAME="com.neetmocktest.refreshquestions"
PLIST_FILE="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"

echo "📅 Setting up daily question refresh at 1:00 AM..."
echo ""

# Check if Node.js and Puppeteer are available
if command -v node &> /dev/null; then
    echo "✅ Node.js found"
    
    # Check if puppeteer is installed
    if [ -f "$SCRIPT_DIR/node_modules/puppeteer/package.json" ] || npm list -g puppeteer &> /dev/null; then
        USE_NODE=true
        REFRESH_SCRIPT="$SCRIPT_DIR/refresh_questions.js"
        echo "✅ Using Node.js with Puppeteer"
    else
        echo "⚠️  Puppeteer not found. Installing..."
        cd "$SCRIPT_DIR"
        npm install puppeteer --save 2>&1 | tail -5
        if [ $? -eq 0 ]; then
            USE_NODE=true
            REFRESH_SCRIPT="$SCRIPT_DIR/refresh_questions.js"
            echo "✅ Puppeteer installed"
        else
            USE_NODE=false
            echo "⚠️  Falling back to web-based refresh"
        fi
    fi
else
    USE_NODE=false
    echo "⚠️  Node.js not found. Using web-based refresh method"
fi

# Create LaunchAgents directory if it doesn't exist
mkdir -p "$HOME/Library/LaunchAgents"

# Determine which script to use
if [ "$USE_NODE" = true ]; then
    SCRIPT_COMMAND="/usr/local/bin/node"
    SCRIPT_ARGS="$REFRESH_SCRIPT"
else
    # Use web-based method - open the refresh page
    SCRIPT_COMMAND="/usr/bin/open"
    SCRIPT_ARGS="-a 'Google Chrome' 'http://localhost:8040/refresh_questions_web.html'"
fi

# Create the plist file
cat > "$PLIST_FILE" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${PLIST_NAME}</string>
    <key>ProgramArguments</key>
    <array>
        <string>${SCRIPT_COMMAND}</string>
        <string>${SCRIPT_ARGS}</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>1</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>RunAtLoad</key>
    <false/>
    <key>StandardOutPath</key>
    <string>${SCRIPT_DIR}/refresh_questions.log</string>
    <key>StandardErrorPath</key>
    <string>${SCRIPT_DIR}/refresh_questions_error.log</string>
</dict>
</plist>
EOF

echo "✅ Created plist file: $PLIST_FILE"
echo ""

# Unload existing job if it exists
if launchctl list | grep -q "$PLIST_NAME"; then
    echo "🔄 Unloading existing job..."
    launchctl unload "$PLIST_FILE" 2>/dev/null
fi

# Load the new job
echo "📥 Loading scheduled job..."
launchctl load "$PLIST_FILE"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Daily refresh scheduled successfully!"
    echo ""
    echo "📋 Schedule Details:"
    echo "   • Time: 1:00 AM daily"
    echo "   • Action: Clear uploaded questions from localStorage"
    echo "   • Log file: $SCRIPT_DIR/refresh_questions.log"
    echo ""
    echo "🔧 Management Commands:"
    echo "   • Check status: launchctl list | grep $PLIST_NAME"
    echo "   • Stop: launchctl unload $PLIST_FILE"
    echo "   • Start: launchctl load $PLIST_FILE"
    echo "   • View logs: tail -f $SCRIPT_DIR/refresh_questions.log"
    echo ""
    echo "🧪 Test the refresh now:"
    if [ "$USE_NODE" = true ]; then
        echo "   node $REFRESH_SCRIPT"
    else
        echo "   open -a 'Google Chrome' 'http://localhost:8040/refresh_questions_web.html'"
    fi
else
    echo "❌ Failed to load scheduled job"
    exit 1
fi



