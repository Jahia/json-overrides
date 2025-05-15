#!/bin/bash
#curl \
#  -H "Accept: application/vnd.github+json" \
#  -H "Authorization: Bearer <YOUR-TOKEN>" \
#  https://api.github.com/repos/OWNER/REPO/contents/PATH

# if there is no url request the list of urls from the repo oterwise downlod the specified file into the current directory

# check if the first argument is empty
if [ -z "$1" ]; then
  echo "No URL provided. Fetching list of URLs from the repository..."
  # Fetch the list of URLs from the GitHub repository
  curl --silent \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    https://api.github.com/repos/iconify/icon-sets/contents/json \
    | jq '.[] | select(.name | contains("json")) | .download_url'
else
  # Download the specified file into the current directory
  echo "Downloading file from URL: $1"
  curl --silent -L --output "icons.json" "$1"
  # Convert the Iconify JSON to Jahia value constraints for dropdown values
  node iconifyJSONToJahiaConstraintConverter.js > constraints.json
  # Replace the value constraints in the Jahia JSON file
  node replaceValueConstraints.js
fi
