import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  CheckSquare, 
  Globe, 
  MessageSquare, 
  Moon, 
  Sun, 
  Zap,
  TrendingUp,
  Users,
  BarChart3,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('agent-data');
  const [realTimeData, setRealTimeData] = useState({
    sessions: 147,
    tokens: 2847592,
    uptime: '99.8%',
    activeConnections: 23
  });

  // Simulate real-time updates with smooth animations
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        sessions: prev.sessions + Math.floor(Math.random() * 3),
        tokens: prev.tokens + Math.floor(Math.random() * 1000),
        activeConnections: Math.floor(Math.random() * 30) + 15
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { 
      id: 'agent-data', 
      label: 'Agent Data', 
      icon: Activity, 
      color: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'tasks', 
      label: 'Tasks', 
      icon: CheckSquare, 
      color: 'text-emerald-600 dark:text-emerald-400',
      gradient: 'from-emerald-500 to-green-600'
    },
    { 
      id: 'knowledge', 
      label: 'Knowledge Board', 
      icon: Brain, 
      color: 'text-purple-600 dark:text-purple-400',
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  const agentStats = [
    { 
      label: 'Active Sessions', 
      value: realTimeData.sessions, 
      icon: MessageSquare, 
      change: '+12%',
      trend: 'up',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Tokens Used', 
      value: realTimeData.tokens.toLocaleString(), 
      icon: Zap, 
      change: '+8%',
      trend: 'up',
      gradient: 'from-yellow-500 to-orange-600'
    },
    { 
      label: 'Uptime', 
      value: realTimeData.uptime, 
      icon: Activity, 
      change: 'Stable',
      trend: 'stable',
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      label: 'Connections', 
      value: realTimeData.activeConnections, 
      icon: Globe, 
      change: '+5%',
      trend: 'up',
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  const tasks = [
    { id: 1, title: 'Optimize model performance', status: 'In Progress', priority: 'High', assignee: 'AI-Agent-01', progress: 75 },
    { id: 2, title: 'Update knowledge base', status: 'Completed', priority: 'Medium', assignee: 'AI-Agent-02', progress: 100 },
    { id: 3, title: 'Process user feedback', status: 'Pending', priority: 'Low', assignee: 'AI-Agent-03', progress: 0 },
    { id: 4, title: 'Generate analytics report', status: 'In Progress', priority: 'High', assignee: 'AI-Agent-01', progress: 45 }
  ];

  const knowledgeItems = [
    { category: 'Development', count: 156, lastUpdated: '2 hours ago', color: 'bg-gradient-to-br from-blue-500 to-blue-600', icon: '💻' },
    { category: 'User Insights', count: 89, lastUpdated: '1 hour ago', color: 'bg-gradient-to-br from-green-500 to-emerald-600', icon: '👥' },
    { category: 'System Logs', count: 234, lastUpdated: '30 mins ago', color: 'bg-gradient-to-br from-yellow-500 to-orange-600', icon: '📊' },
    { category: 'Performance', count: 67, lastUpdated: '15 mins ago', color: 'bg-gradient-to-br from-purple-500 to-indigo-600', icon: '⚡' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Enhanced Header with Premium Styling */}
      <header className="sticky top-0 z-50 glass border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg hover-glow">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-primary">
                  OpenClaw Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Premium AI Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="live-indicator">
                <div className="live-dot" />
                <span>Live</span>
              </div>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="btn-ghost !p-2 rounded-xl hover-lift"
              >
                {isDark ? 
                  <Sun className="w-5 h-5 text-yellow-500" /> : 
                  <Moon className="w-5 h-5 text-slate-600" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Navigation Tabs */}
      <div className="glass border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-tab ${isActive ? 'nav-tab-active' : 'nav-tab-inactive'} group`}
                >
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` 
                      : 'group-hover:bg-gray-100 dark:group-hover:bg-slate-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'agent-data' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gradient mb-2">
                    Agent Performance Dashboard
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Real-time insights and analytics</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Last updated: just now</span>
                </div>
              </div>
              
              {/* Premium Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {agentStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="metric-card group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`metric-icon bg-gradient-to-br ${stat.gradient}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          stat.trend === 'up' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : stat.trend === 'down'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {stat.change}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-gradient transition-all duration-300">
                          {stat.value}
                        </p>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enhanced Real-time Activity */}
              <div className="card-premium animate-slide-up">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Real-time Activity
                    </h3>
                    <div className="live-indicator !py-1 !px-3">
                      <div className="live-dot !w-1.5 !h-1.5" />
                      <span className="text-xs">Active</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { 
                        text: 'Processing user query: "Optimize dashboard performance"', 
                        time: 'Just now', 
                        color: 'bg-green-500', 
                        pulse: true 
                      },
                      { 
                        text: 'Generated analytics report for Q4 2024', 
                        time: '2 minutes ago', 
                        color: 'bg-blue-500', 
                        pulse: false 
                      },
                      { 
                        text: 'Updated knowledge base with 47 new entries', 
                        time: '5 minutes ago', 
                        color: 'bg-purple-500', 
                        pulse: false 
                      },
                      { 
                        text: 'Completed system optimization routine', 
                        time: '8 minutes ago', 
                        color: 'bg-emerald-500', 
                        pulse: false 
                      }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-md transition-all duration-300">
                        <div className={`w-3 h-3 ${activity.color} rounded-full mt-2 ${activity.pulse ? 'animate-pulse shadow-lg' : ''} ${activity.color.replace('bg-', 'shadow-')}/30`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 dark:text-gray-200 font-medium">
                            {activity.text}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gradient mb-2">
                  Task Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Organize and track AI agent tasks</p>
              </div>
              <button className="btn-primary">
                <CheckSquare className="w-4 h-4 mr-2" />
                Create Task
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {['Pending', 'In Progress', 'Completed'].map((status, columnIndex) => (
                <div key={status} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {status}
                    </h3>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      status === 'Pending' ? 'bg-yellow-500' :
                      status === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {tasks.filter(task => task.status === status).length}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {tasks
                      .filter(task => task.status === status)
                      .map((task, index) => (
                        <div
                          key={task.id}
                          className="card-hover p-6 animate-slide-up"
                          style={{ animationDelay: `${(columnIndex * 0.1) + (index * 0.05)}s` }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                {task.title}
                              </h4>
                              {task.progress > 0 && (
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${task.progress}%` }}
                                  />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                task.priority === 'High' 
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                                  : task.priority === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              }`}>
                                {task.priority}
                              </span>
                              <div className="flex items-center space-x-2">
                                <Users className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {task.assignee}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-2">
                Knowledge Board
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Centralized intelligence and insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {knowledgeItems.map((item, index) => (
                <div
                  key={index}
                  className="card-hover p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {item.icon}
                    </div>
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {item.category}
                    </h3>
                    <p className="text-3xl font-bold text-gradient">
                      {item.count}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Updated {item.lastUpdated}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-premium animate-slide-up">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Recent Insights
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Performance Optimization Recommendations',
                      content: 'Based on recent analysis, implementing caching mechanisms could improve response times by 34%.',
                      icon: TrendingUp,
                      gradient: 'from-green-500 to-emerald-600'
                    },
                    {
                      title: 'User Behavior Patterns',
                      content: 'Peak usage hours are between 9-11 AM and 2-4 PM. Consider scaling resources during these periods.',
                      icon: Users,
                      gradient: 'from-blue-500 to-indigo-600'
                    }
                  ].map((insight, index) => (
                    <div key={index} className="card p-6 hover-lift">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${insight.gradient} flex items-center justify-center shadow-lg`}>
                          <insight.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {insight.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {insight.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;