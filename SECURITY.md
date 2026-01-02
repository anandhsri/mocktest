# Security and Backup Guide for NEET Mock Test Project

## Project Status
✅ All files have been saved and secured
✅ Backups created in `backups/` directory
✅ File permissions set appropriately
✅ .gitignore configured

## Important Files

### Core Application Files
- `index.html` - Main HTML structure
- `app.js` - Application logic (146KB)
- `questions.js` - Question bank (80KB)
- `styles.css` - Styling (43KB)
- `server.py` - Python HTTP server

### Configuration Files
- `package.json` - Node.js dependencies
- `.gitignore` - Git ignore rules
- `server.py` - Server configuration

### Scripts
- `backup_project.sh` - Automated backup script
- `start-server.sh` - Server startup script
- `refresh_questions.js` - Daily question refresh
- `clear_test_results.js` - Clear test results utility

## Backup Strategy

### Automatic Backups
Run the backup script manually:
```bash
chmod +x backup_project.sh
./backup_project.sh
```

### Manual Backups
Backups are stored in `backups/` directory with timestamps:
- Format: `neet-mock-test-backup-YYYYMMDD_HHMMSS.tar.gz`
- Contains all core files and configurations

### Current Backup
Latest backup created: `backups/neet-mock-test-backup-20260102_181111.tar.gz`

## File Permissions

### Core Files
- `*.js`, `*.html`, `*.css`, `*.md` - Read/Write (644)
- `*.sh`, `*.py` - Executable (755)

### Security Recommendations
1. ✅ Regular backups (daily recommended)
2. ✅ Version control with Git
3. ✅ Secure server access
4. ✅ Protect sensitive data (if any)

## Git Repository Setup

To complete git setup, run:
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Save and secure mock test project"
```

## Project Structure

```
neet-mock-test/
├── Core Files
│   ├── index.html
│   ├── app.js
│   ├── questions.js
│   └── styles.css
├── Server
│   ├── server.py
│   └── start-server.sh
├── Scripts
│   ├── backup_project.sh
│   ├── refresh_questions.js
│   └── clear_test_results.js
├── Backups
│   └── backups/
└── Documentation
    ├── README.md
    ├── SECURITY.md
    └── *.md files
```

## Current Question Bank Status

### Subjects Available (5)
1. ✅ Mathematics - 50 questions
2. ✅ Physics - 50 questions
3. ✅ Chemistry - 50 questions
4. ✅ Biology - 50 questions
5. ✅ Social Science - 50 questions (Refreshed)

### Total Questions: 250
- Years: 2020-2025
- Source: CBSE 10th Grade Board Papers
- Difficulty: Moderate

## Security Checklist

- [x] All files saved
- [x] Backups created
- [x] File permissions set
- [x] .gitignore configured
- [ ] Git repository committed (requires user identity setup)
- [x] Documentation updated

## Next Steps

1. Set up git user identity (if using git)
2. Commit changes to git repository
3. Set up automated daily backups (optional)
4. Review and secure server access
5. Test backup restoration process

## Restoration

To restore from backup:
```bash
cd backups
tar -xzf neet-mock-test-backup-YYYYMMDD_HHMMSS.tar.gz
# Copy files back to project root
```

---
Last Updated: January 2, 2025
Project Status: ✅ Secured and Backed Up

