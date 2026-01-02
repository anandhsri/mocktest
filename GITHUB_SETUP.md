# GitHub Setup Instructions

## Step 1: Configure Git (if not already done)

```bash
cd /Users/anandsrinivasan/neet-mock-test
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 2: Stage and Commit All Files

```bash
# Add all files
git add .

# Commit with message
git commit -m "Initial commit: NEET Mock Test Application

- Complete mock test application for CBSE 10th grade
- 5 subjects: Mathematics, Physics, Chemistry, Biology, Social Science
- 250 questions from CBSE 2020-2025 papers
- Features: Login system, proctoring, PDF reports, analytics
- Admin dashboard with question upload
- Daily question refresh automation"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `neet-mock-test` (or your preferred name)
3. Description: "CBSE 10th Grade Mock Test Application with Proctoring"
4. Choose: **Private** (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 4: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/neet-mock-test.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/neet-mock-test.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Verify

Visit your repository on GitHub to verify all files are uploaded.

## Important Notes

- **Backups folder** is excluded via .gitignore (not uploaded to GitHub)
- **node_modules** is excluded (can be reinstalled with `npm install`)
- **Log files** are excluded
- All core application files will be uploaded

## Repository Contents

The following will be uploaded to GitHub:
- ✅ Core application files (index.html, app.js, questions.js, styles.css)
- ✅ Server files (server.py, start-server.sh)
- ✅ Scripts and utilities
- ✅ Documentation files
- ✅ Configuration files
- ❌ Backups (excluded)
- ❌ node_modules (excluded)
- ❌ Log files (excluded)

---

**Ready to push!** Follow the steps above to upload your project to GitHub.

