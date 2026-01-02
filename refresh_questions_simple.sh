#!/bin/bash
# Simple script to refresh questions by clearing localStorage
# This version uses AppleScript to control Safari/Chrome

APP_URL="http://localhost:8040"
LOG_FILE="$HOME/neet-mock-test/refresh_questions.log"

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log_message "Starting question refresh..."

# Try to clear localStorage using AppleScript
osascript <<EOF
tell application "Google Chrome"
    activate
    try
        open location "$APP_URL"
        delay 3
        tell application "System Events"
            keystroke "j" using {command down, option down}
            delay 1
            keystroke "localStorage.clear()"
            keystroke return
            delay 1
            keystroke "w" using {command down}
        end tell
    on error errMsg
        log "Error: " & errMsg
    end try
end tell
EOF

if [ $? -eq 0 ]; then
    log_message "Question refresh completed"
    echo "✅ Questions refreshed successfully"
else
    log_message "Error: Failed to refresh questions"
    echo "❌ Failed to refresh questions"
    exit 1
fi



