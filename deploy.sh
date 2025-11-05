#!/bin/bash

set -e  # Exit on error

# Ensure we're on main branch
current_branch=$(git branch --show-current 2>/dev/null || echo "")
if [ "$current_branch" != "main" ]; then
  echo "Switching to main branch..."
  git checkout main 2>/dev/null || git checkout -b main
fi

# Build for GitHub Pages
echo "Building for GitHub Pages..."
npm run build:pages

# Check if dist directory exists
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found after build"
  exit 1
fi

# Create or checkout gh-pages branch
echo "Preparing gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
  git checkout gh-pages
  git rm -rf . --quiet 2>/dev/null || true
else
  git checkout --orphan gh-pages
fi

# Copy dist contents to root (including hidden files)
cp -r dist/* .
cp -r dist/.* . 2>/dev/null || true

# Remove dist directory if it was copied
rm -rf dist

# Add all files
git add .

# Commit
if ! git diff --staged --quiet; then
  git commit -m "Deploy to GitHub Pages [$(date +'%Y-%m-%d %H:%M:%S')]"
else
  echo "No changes to commit"
fi

# Push to gh-pages branch
echo "Pushing to gh-pages branch..."
git push origin gh-pages --force

# Switch back to main branch
echo "Switching back to main branch..."
git checkout main

echo ""
echo "✓ Deployment complete!"
echo "Your site should be available at: https://xsanctom.github.io/tk-docs/"
echo "It may take a few minutes for GitHub Pages to update."

