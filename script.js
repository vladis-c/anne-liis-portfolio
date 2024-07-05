import { execSync } from 'child_process';
import path from 'path';

try {
  // Resolve the absolute path of the shell script
  const scriptPath = path.resolve('./run_commands.sh');

  // Execute the shell script
  const output = execSync(scriptPath, { encoding: 'utf-8' });
  console.log(`Script output: ${output}`);

  // Continue with more actions if needed
} catch (error) {
  console.error(`Error: ${error.message}`);
  if (error.stdout) {
    console.error(`Standard Output: ${error.stdout}`);
  }
  if (error.stderr) {
    console.error(`Standard Error: ${error.stderr}`);
  }
}
