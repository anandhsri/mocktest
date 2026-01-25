#!/bin/bash
# Setup script to schedule question bank refresh every 2 hours
# Creates a launchd plist for macOS

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLIST_NAME="com.neetmocktest.questionrefresh"
PLIST_FILE="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"
UPDATE_SCRIPT="$SCRIPT_DIR/update_and_merge_questions.js"

echo "📅 Setting up question bank refresh every 2 hours..."
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if puppeteer is installed
if [ ! -f "$SCRIPT_DIR/node_modules/puppeteer/package.json" ]; then
    echo "⚠️  Puppeteer not found. Installing..."
    cd "$SCRIPT_DIR"
    npm install puppeteer --save 2>&1 | tail -5
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install puppeteer"
        exit 1
    fi
    echo "✅ Puppeteer installed"
fi

# Check if update script exists
if [ ! -f "$UPDATE_SCRIPT" ]; then
    echo "❌ Update script not found: $UPDATE_SCRIPT"
    exit 1
fi

# Create LaunchAgents directory if it doesn't exist
mkdir -p "$HOME/Library/LaunchAgents"

# Find node path
NODE_PATH=$(which node)

# Create the plist file for every 2 hours
cat > "$PLIST_FILE" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${PLIST_NAME}</string>
    <key>ProgramArguments</key>
    <array>
        <string>${NODE_PATH}</string>
        <string>${UPDATE_SCRIPT}</string>
    </array>
    <key>StartInterval</key>
    <integer>7200</integer>
    <key>RunAtLoad</key>
    <false/>
    <key>StandardOutPath</key>
    <string>${SCRIPT_DIR}/question_update.log</string>
    <key>StandardErrorPath</key>
    <string>${SCRIPT_DIR}/question_update_error.log</string>
    <key>WorkingDirectory</key>
    <string>${SCRIPT_DIR}</string>
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
    echo "✅ Question refresh scheduled successfully!"
    echo ""
    echo "📋 Schedule Details:"
    echo "   • Frequency: Every 2 hours"
    echo "   • Action: Download 25 new questions, remove 25 attempted questions"
    echo "   • Log file: $SCRIPT_DIR/question_update.log"
    echo "   • Error log: $SCRIPT_DIR/question_update_error.log"
    echo ""
    echo "🔧 Management Commands:"
    echo "   • Check status: launchctl list | grep $PLIST_NAME"
    echo "   • Stop: launchctl unload $PLIST_FILE"
    echo "   • Start: launchctl load $PLIST_FILE"
    echo "   • View logs: tail -f $SCRIPT_DIR/question_update.log"
    echo "   • View errors: tail -f $SCRIPT_DIR/question_update_error.log"
    echo ""
    echo "🧪 Test the refresh now:"
    echo "   node $UPDATE_SCRIPT"
    echo ""
else
    echo "❌ Failed to load scheduled job"
    exit 1
fi
