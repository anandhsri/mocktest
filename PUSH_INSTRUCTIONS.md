# Push Instructions for GitHub

## ✅ Project Ready to Push

**Repository:** https://github.com/anandhsri/neet-mock-test  
**Commits:** 5 commits ready  
**Files:** 39 files ready

## Step 1: Create Repository on GitHub (if not created)

1. Go to: **https://github.com/new**
2. Repository name: `neet-mock-test`
3. Description: "CBSE 10th Grade Mock Test Application"
4. Choose: **Private** or **Public**
5. **DO NOT** check "Initialize with README"
6. Click **"Create repository"**

## Step 2: Push to GitHub

### Option A: Using HTTPS (Recommended for first time)

```bash
cd /Users/anandsrinivasan/neet-mock-test
git push -u origin main
```

**When prompted:**
- **Username:** `anandhsri`
- **Password:** Use a **Personal Access Token** (NOT your GitHub password)

### Option B: Using Personal Access Token

1. Create a token at: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "neet-mock-test"
4. Select scope: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

Then push:
```bash
cd /Users/anandsrinivasan/neet-mock-test
git push -u origin main
```

When prompted for password, paste your Personal Access Token.

### Option C: Using SSH (if you have SSH keys set up)

If you have SSH keys configured with GitHub:

```bash
# Change remote to SSH
git remote set-url origin git@github.com:anandhsri/neet-mock-test.git

# Push
git push -u origin main
```

## Step 3: Verify Upload

After successful push, visit:
```
https://github.com/anandhsri/neet-mock-test
```

You should see all your files there!

## Troubleshooting

### Authentication Failed
- Make sure you're using a Personal Access Token, not your password
- Token must have `repo` scope

### Repository Not Found
- Make sure you've created the repository on GitHub first
- Check the repository name matches: `neet-mock-test`

### Permission Denied
- Verify your GitHub username is correct: `anandhsri`
- Check that you have write access to the repository

## Quick Push Command

```bash
cd /Users/anandsrinivasan/neet-mock-test && git push -u origin main
```

---
**Ready to push!** Follow the steps above to upload your project to GitHub.

