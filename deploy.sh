#!/bin/bash

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
git checkout --orphan gh-pages 2>/dev/null || git checkout gh-pages

# Remove all files except dist
git rm -rf . --quiet 2>/dev/null || true

# Copy dist contents to root
cp -r dist/* .

# Add all files
git add .

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
echo "Pushing to gh-pages branch..."
git push origin gh-pages --force

# Switch back to main branch
git checkout main 2>/dev/null || git checkout -b main

echo "Deployment complete! Your site should be available at https://xsanctom.github.io/tk-docs/"

