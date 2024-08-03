#!/bin/bash

set -e

# Load environment variables from .env file
export $(grep -v '^#' .env.script | xargs)

# Fetch and compare JSON responses
echo "Fetching and comparing JSON responses..."
node compareEnvs.js

# Execute the first command
create_output=$(contentful-merge create --cda-token "$CDA_TOKEN" --space "$SPACE_ID" --source "$SOURCE_BRANCH" --target "$TARGET_BRANCH")
echo "Create command output: $create_output"

# Extract the file path from the output
file_path=$(echo "$create_output" | grep -o '💾\s*/.*\.json' | awk '{print $2}')
if [ -z "$file_path" ]; then
  echo "Error: Could not find the file path in the output."
  exit 1
fi
echo "Extracted file path: $file_path"

# Execute the second command with auto-confirmation
echo "Executing apply command with file path: $file_path"
echo "Y" | contentful-merge apply --cma-token "$CMA_TOKEN" --space "$SPACE_ID" --environment "staging" --file "$file_path"
