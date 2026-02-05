#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Create data directories
const publicDataDir = path.join(__dirname, '..', 'public', 'api');
const distDataDir = path.join(__dirname, '..', 'dist', 'api');

if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}

if (!fs.existsSync(path.join(__dirname, '..', 'public'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'public'), { recursive: true });
}

// Mock bot status data
const botStatus = {
  model: "claude-sonnet-4",
  memoryEnabled: true,
  status: "active",
  version: "2026.1.24"
};

// Mock session status data  
const sessionStatus = {
  count: 1,
  contextUsed: 13000,
  contextLimit: 40000,
  activeSessions: 1
};

// Mock activity feed data
const activityFeed = [
  {
    id: 1,
    type: "message",
    title: "Dashboard deployed",
    description: "AI Agent Dashboard successfully deployed to GitHub Pages",
    timestamp: new Date().toISOString(),
    status: "success"
  },
  {
    id: 2,
    type: "task",
    title: "Build completed", 
    description: "React app built with 811KB bundle size",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: "info"
  }
];

// Mock token statistics
const tokenStats = {
  today: {
    input: 15200,
    output: 8900,
    total: 24100
  },
  thisWeek: {
    input: 45600,
    output: 28300,
    total: 73900
  },
  costs: {
    today: 0.24,
    thisWeek: 0.89
  }
};

// Mock task data
const taskData = {
  backlog: [
    {
      id: "task-1",
      title: "Implement real-time notifications",
      description: "Add WebSocket connection for live updates",
      priority: "high",
      assignee: "AI Agent"
    }
  ],
  inProgress: [
    {
      id: "task-2", 
      title: "Optimize bundle size",
      description: "Reduce JavaScript bundle from 811KB",
      priority: "medium",
      assignee: "AI Agent"
    }
  ],
  done: [
    {
      id: "task-3",
      title: "Deploy to GitHub Pages",
      description: "Set up CI/CD pipeline with GitHub Actions",
      priority: "high", 
      assignee: "AI Agent"
    }
  ]
};

// Write all mock data files
fs.writeFileSync(path.join(publicDataDir, 'bot-status.json'), JSON.stringify(botStatus, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'sessions-status.json'), JSON.stringify(sessionStatus, null, 2)); 
fs.writeFileSync(path.join(publicDataDir, 'activity.json'), JSON.stringify(activityFeed, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'token-stats.json'), JSON.stringify(tokenStats, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'tasks.json'), JSON.stringify(taskData, null, 2));

console.log('Mock data created for CI build');