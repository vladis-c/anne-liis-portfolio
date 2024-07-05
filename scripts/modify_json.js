const fs = require('fs');

// Get the file path and new image ID from arguments
const [, , filePath] = process.argv;
const newImageId = process.env.NEW_IMAGE_ID;

if (!filePath || !newImageId) {
  console.error('Usage: node modify_json.js <file_path>');
  console.error('Ensure NEW_IMAGE_ID is set in environment variables.');
  process.exit(1);
}

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }

  // Parse the JSON data
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error(`Error parsing JSON: ${parseErr.message}`);
    process.exit(1);
  }

  // Modify the JSON data
  if (
    jsonData.items &&
    jsonData.items[0] &&
    jsonData.items[0].data &&
    jsonData.items[0].data.fields &&
    jsonData.items[0].data.fields.image &&
    jsonData.items[0].data.fields.image['en-US'] &&
    jsonData.items[0].data.fields.image['en-US'].sys
  ) {
    jsonData.items[0].data.fields.image['en-US'].sys.id = newImageId;
  } else {
    console.error('Error: Invalid JSON structure.');
    process.exit(1);
  }

  // Write the modified JSON back to the file
  fs.writeFile(
    filePath,
    JSON.stringify(jsonData, null, 2),
    'utf8',
    writeErr => {
      if (writeErr) {
        console.error(`Error writing file: ${writeErr.message}`);
        process.exit(1);
      }
      console.log('JSON file successfully modified.');
    },
  );
});
