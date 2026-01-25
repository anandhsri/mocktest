# Download Tough Questions from CBSE NCERT Class 10 (2024-2025)

This document explains how to download tough questions from CBSE NCERT Class 10 board exam papers and remove easy questions.

## Scripts Created

1. **`filter_tough_questions.js`** - Filters out easy questions from the existing question bank
2. **`download_tough_questions.js`** - Downloads and adds tough questions (requires network access)

## How to Run

### Step 1: Filter Existing Questions

Run the filter script to remove easy questions:

```bash
node filter_tough_questions.js
```

This script will:
- Read all questions from `questions.js`
- Classify each question as easy/medium/hard based on:
  - Question complexity (keywords like "prove", "calculate", "solve")
  - Question length
  - Chapter difficulty
  - Mathematical complexity
- Remove all easy questions
- Keep only tough and medium questions
- Update `questions.js` with filtered questions

### Step 2: Add More Tough Questions (Optional)

If you want to add more tough questions from CBSE sources:

```bash
node download_tough_questions.js
```

**Note**: This script currently generates tough questions based on CBSE patterns. To actually download from CBSE websites, you would need to:
1. Implement web scraping for CBSE question papers
2. Parse PDF files from CBSE website
3. Extract questions and classify them

## Difficulty Classification Criteria

### Easy Questions (Removed)
- Simple factual questions ("What is...", "Which...", "Who...")
- Very short questions (< 50 characters)
- Questions without complex calculations or reasoning

### Medium Questions (Kept)
- Questions requiring some calculation or reasoning
- Questions with moderate length (50-120 characters)
- Questions from standard chapters

### Hard Questions (Kept)
- Questions requiring proof or derivation
- Questions with complex calculations
- Long questions (> 120 characters)
- Questions from advanced chapters (Polynomials, Trigonometry, etc.)
- Questions with keywords: "prove", "derive", "calculate", "solve", "find the value"

## Expected Results

After running `filter_tough_questions.js`:
- **Before**: ~500 questions (100 per subject)
- **After**: ~300-400 questions (only tough/medium)
- **Removed**: ~100-200 easy questions

## Log Files

- `question_filter.log` - Logs of filtering operations
- `question_update.log` - Logs of question updates

## Manual Review

After running the script, you may want to manually review:
1. Check if any tough questions were incorrectly classified as easy
2. Verify that all remaining questions are indeed tough/medium
3. Ensure question IDs are still unique
4. Test the application to ensure questions load correctly

## Troubleshooting

1. **Script fails to parse questions.js**
   - Ensure `questions.js` has valid JavaScript syntax
   - Check that the file structure matches the expected format

2. **Too many questions removed**
   - Adjust the `classifyDifficulty` function in `filter_tough_questions.js`
   - Make the criteria less strict

3. **Not enough questions removed**
   - Make the criteria more strict
   - Add more patterns to identify easy questions

## Next Steps

1. Run `node filter_tough_questions.js` to filter existing questions
2. Review the results
3. Test the application
4. Optionally add more tough questions from CBSE sources
