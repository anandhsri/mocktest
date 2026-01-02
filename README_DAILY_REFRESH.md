# Daily Question Refresh Setup

This setup automatically refreshes (clears) uploaded questions every day at 1:00 AM.

## Quick Setup

Run the setup script:

```bash
./setup_daily_refresh.sh
```

This will:
1. Check for Node.js and Puppeteer (or use web-based method)
2. Create a macOS launchd job
3. Schedule daily refresh at 1:00 AM

## What Gets Refreshed

- ✅ **Uploaded questions** (cleared from localStorage)
- ✅ **Base questions** from `questions.js` (preserved)
- ✅ **Test results** (preserved by default)

## Methods

### Method 1: Node.js with Puppeteer (Recommended)
- Uses headless browser automation
- Works even if browser isn't open
- Requires Node.js and Puppeteer

### Method 2: Web-based (Fallback)
- Opens a web page that clears localStorage
- Requires browser to be available
- Simpler, no dependencies

## Manual Refresh

### Option 1: Using Web Interface
1. Open: `http://localhost:8040/refresh_questions_web.html`
2. Click "Refresh Questions" button

### Option 2: Using Node.js Script
```bash
node refresh_questions.js
```

## Management Commands

### Check Status
```bash
launchctl list | grep com.neetmocktest.refreshquestions
```

### Stop Scheduled Job
```bash
launchctl unload ~/Library/LaunchAgents/com.neetmocktest.refreshquestions.plist
```

### Start Scheduled Job
```bash
launchctl load ~/Library/LaunchAgents/com.neetmocktest.refreshquestions.plist
```

### View Logs
```bash
tail -f refresh_questions.log
tail -f refresh_questions_error.log
```

### Remove Scheduled Job
```bash
launchctl unload ~/Library/LaunchAgents/com.neetmocktest.refreshquestions.plist
rm ~/Library/LaunchAgents/com.neetmocktest.refreshquestions.plist
```

## Change Schedule Time

Edit the plist file:
```bash
nano ~/Library/LaunchAgents/com.neetmocktest.refreshquestions.plist
```

Change the `Hour` and `Minute` values, then reload:
```bash
launchctl unload ~/Library/LaunchAgents/com.neetmocktest.refreshquestions.plist
launchctl load ~/Library/LaunchAgents/com.neetmocktest.refreshquestions.plist
```

## Troubleshooting

### Job Not Running
1. Check if job is loaded: `launchctl list | grep refreshquestions`
2. Check logs: `cat refresh_questions_error.log`
3. Ensure server is running on port 8040
4. Try manual refresh to test

### Node.js Method Not Working
- Install Node.js: `brew install node`
- Install Puppeteer: `npm install puppeteer`
- Or use web-based method instead

### Web Method Not Working
- Ensure Chrome/Safari is installed
- Ensure server is accessible at localhost:8040
- Check browser console for errors

## Files

- `refresh_questions.js` - Node.js script with Puppeteer
- `refresh_questions_web.html` - Web-based refresh page
- `setup_daily_refresh.sh` - Setup script
- `refresh_questions.log` - Success logs
- `refresh_questions_error.log` - Error logs



