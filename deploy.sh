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

# Copy dist to temporary location (we'll lose it when switching branches)
echo "Backing up build files..."
TEMP_DIR=$(mktemp -d)
cp -r dist/* "$TEMP_DIR/" 2>/dev/null || true
find dist -mindepth 1 -maxdepth 1 -name '.*' -exec cp -r {} "$TEMP_DIR/" \; 2>/dev/null || true

# Create or checkout gh-pages branch
echo "Preparing gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
  git checkout gh-pages
  # Remove all tracked files
  git rm -rf . --quiet 2>/dev/null || true
  # Remove any remaining files except .git
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} + 2>/dev/null || true
else
  git checkout --orphan gh-pages
  # Remove all files except .git
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} + 2>/dev/null || true
fi

# Copy dist contents from temp to root
echo "Copying build files to gh-pages branch..."
cp -r "$TEMP_DIR"/* . 2>/dev/null || true
find "$TEMP_DIR" -mindepth 1 -maxdepth 1 -name '.*' -exec cp -r {} . \; 2>/dev/null || true

# Clean up temp directory
rm -rf "$TEMP_DIR"

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

