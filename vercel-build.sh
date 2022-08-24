#!/bin/bash

# Installing dependencies
echo "Installing dependencies..."
npm install

# generating json file
echo "Generation Json..."
node lib/jsonGenerator.js

# generating theme screenshots
echo "Generation Theme Screenshots..."
node lib/screenshotThemes.js

# generating resource screenshots
echo "Generation Resource Screenshots..."
node lib/screenshotResources.js

# building site
echo "Building Site..."
npm run build