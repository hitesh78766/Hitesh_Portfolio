const { execSync } = require('child_process');
const fs = require('fs');

console.log("=== Starting Vercel Build ===");
try {
  // Step 1: Install and build inside the app folder
  execSync('npm install', { cwd: 'app', stdio: 'inherit' });
  execSync('npm run build', { cwd: 'app', stdio: 'inherit' });

  // Step 2: Vercel defaults to the "public" folder for static sites.
  // We will move the compiled app/dist folder to the root public folder.
  console.log("Moving built files for Vercel...");
  
  if (fs.existsSync('public')) {
    fs.rmSync('public', { recursive: true, force: true });
  }
  
  fs.renameSync('app/dist', 'public');
  
  console.log("=== Build Complete ===");
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}
