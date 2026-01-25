# Question Bank Auto-Refresh System

This system automatically updates the question bank every 2 hours by:
1. Downloading 25 new questions from CBSE NCERT Class 10 board exam papers
2. Removing 25 questions that have been attempted by students

## Files

- `update_question_bank.js` - Downloads new questions and identifies attempted ones
- `merge_questions.js` - Merges new questions into questions.js and removes attempted ones
- `update_and_merge_questions.js` - Main script that runs both operations
- `setup_question_refresh.sh` - Setup script to schedule the refresh every 2 hours

## Setup Instructions

### 1. Install Dependencies

```bash
npm install puppeteer
```

### 2. Run Setup Script

```bash
./setup_question_refresh.sh
```

This will:
- Check for Node.js and Puppeteer
- Create a launchd plist file for macOS
- Schedule the job to run every 2 hours

### 3. Test the Script

```bash
node update_and_merge_questions.js
```

## How It Works

### Step 1: Identify Attempted Questions
- Reads test results from localStorage (via Puppeteer)
- Extracts question IDs from all test results
- Identifies the 25 most frequently attempted questions
- Saves the list to `attempted_question_ids.json`

### Step 2: Download New Questions
- Generates/fetches 25 new questions based on CBSE NCERT Class 10 syllabus
- Questions cover all subjects: Mathematics, Physics, Chemistry, Biology, Social Science
- Questions are from 2024-2025 CBSE board exam patterns
- Saves new questions to `new_questions.json`

### Step 3: Merge Questions
- Reads current `questions.js` file
- Removes the 25 most attempted questions
- Adds the 25 new questions
- Updates `questions.js` with the new question bank

## Schedule

The script runs automatically every 2 hours (7200 seconds) using macOS launchd.

## Logs

- **Success logs**: `question_update.log`
- **Error logs**: `question_update_error.log`

View logs:
```bash
tail -f question_update.log
tail -f question_update_error.log
```

## Management Commands

```bash
# Check if job is running
launchctl list | grep com.neetmocktest.questionrefresh

# Stop the job
launchctl unload ~/Library/LaunchAgents/com.neetmocktest.questionrefresh.plist

# Start the job
launchctl load ~/Library/LaunchAgents/com.neetmocktest.questionrefresh.plist

# Remove the job
rm ~/Library/LaunchAgents/com.neetmocktest.questionrefresh.plist
launchctl unload ~/Library/LaunchAgents/com.neetmocktest.questionrefresh.plist
```

## Important Notes

1. **Server Must Be Running**: The script requires the application server to be running on `http://localhost:8040` to access localStorage.

2. **Question Sources**: Currently, the script generates sample questions. To fetch from actual CBSE sources, you'll need to:
   - Implement web scraping for CBSE question papers
   - Use CBSE APIs if available
   - Integrate with question bank APIs

3. **Backup**: The script modifies `questions.js` directly. Make sure you have backups.

4. **Testing**: Always test the script manually before scheduling it.

## Customization

To customize the number of questions to add/remove, edit:
- `update_question_bank.js`: Change the count in `generateNewQuestions(25)`
- `update_question_bank.js`: Change `.slice(0, 25)` to adjust how many attempted questions to remove

## Troubleshooting

1. **Script fails to run**: Check if Node.js and Puppeteer are installed
2. **Cannot access localStorage**: Ensure the server is running on port 8040
3. **Questions not updating**: Check the log files for errors
4. **Permission errors**: Make sure scripts have execute permissions (`chmod +x *.js *.sh`)
