const {execSync} = require('child_process');

try {
  // Execute the shell script
  const output = execSync('./run_commands.sh', {encoding: 'utf-8'});
  console.log(`Script output: ${output}`);

  // Continue with more actions if needed
} catch (error) {
  console.error(`Error: ${error.message}`);
}
