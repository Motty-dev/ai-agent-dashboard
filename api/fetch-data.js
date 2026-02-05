#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runScript(scriptPath) {
  try {
    const result = execSync(`bash ${scriptPath}`, { encoding: 'utf-8' });
    return JSON.parse(result);
  } catch (error) {
    console.error(`Error running ${scriptPath}:`, error.message);
    return null;
  }
}

// Create data directory
const dataDir = path.join(__dirname, '..', 'public', 'api');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Fetch bot status
const botStatus = runScript(path.join(__dirname, 'bot-status.sh'));
if (botStatus) {
  fs.writeFileSync(path.join(dataDir, 'bot-status.json'), JSON.stringify(botStatus, null, 2));
}

// Fetch session status
const sessionStatus = runScript(path.join(__dirname, 'sessions-status.sh'));
if (sessionStatus) {
  fs.writeFileSync(path.join(dataDir, 'sessions-status.json'), JSON.stringify(sessionStatus, null, 2));
}

console.log('Real data fetched and saved to public/api/');