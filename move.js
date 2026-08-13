const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');
const rootDir = __dirname;

if (!fs.existsSync(appDir)) {
  console.log("app folder not found, skipping.");
  process.exit(0);
}

const files = fs.readdirSync(appDir);
for (const file of files) {
  if (file === 'node_modules' || file === 'dist') continue;
  
  const src = path.join(appDir, file);
  const dest = path.join(rootDir, file);
  
  // Overwrite existing files in root (like package.json)
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  
  fs.renameSync(src, dest);
}

// Remove the now-empty app directory (except for node_modules/dist which we can just delete)
fs.rmSync(appDir, { recursive: true, force: true });

console.log("Successfully moved project files to root!");
