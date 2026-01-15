#!/bin/bash
# Script to push NEET Mock Test project to GitHub

echo "🚀 Pushing NEET Mock Test to GitHub..."
echo ""

# Check if remote is already set
if git remote -v | grep -q "origin"; then
    echo "✅ Remote 'origin' already configured"
    git remote -v
else
    echo "⚠️  No remote configured yet"
    echo ""
    echo "Please create a GitHub repository first:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository (e.g., 'neet-mock-test')"
    echo "3. Then run these commands:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/neet-mock-test.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "Visit your repository to verify:"
    git remote get-url origin | sed 's/\.git$//'
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "1. GitHub repository exists"
    echo "2. You have push access"
    echo "3. Authentication is set up (SSH key or personal access token)"
fi



