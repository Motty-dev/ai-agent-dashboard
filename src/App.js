import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  CheckSquare, 
  Globe, 
  MessageSquare, 
  Moon, 
  Sun, 
  Zap 
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

  // Simulate real-time updates
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
    { id: 'agent-data', label: 'Agent Data', icon: Activity, color: 'text-blue-500' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, color: 'text-green-500' },
    { id: 'knowledge', label: 'Knowledge Board', icon: Brain, color: 'text-purple-500' }
  ];

  const agentStats = [
    { label: 'Active Sessions', value: realTimeData.sessions, icon: MessageSquare, change: '+12%' },
    { label: 'Tokens Used', value: realTimeData.tokens.toLocaleString(), icon: Zap, change: '+8%' },
    { label: 'Uptime', value: realTimeData.uptime, icon: Activity, change: 'Stable' },
    { label: 'Connections', value: realTimeData.activeConnections, icon: Globe, change: '+5%' }
  ];

  const tasks = [
    { id: 1, title: 'Optimize model performance', status: 'In Progress', priority: 'High', assignee: 'AI-Agent-01' },
    { id: 2, title: 'Update knowledge base', status: 'Completed', priority: 'Medium', assignee: 'AI-Agent-02' },
    { id: 3, title: 'Process user feedback', status: 'Pending', priority: 'Low', assignee: 'AI-Agent-03' },
    { id: 4, title: 'Generate analytics report', status: 'In Progress', priority: 'High', assignee: 'AI-Agent-01' }
  ];

  const knowledgeItems = [
    { category: 'Development', count: 156, lastUpdated: '2 hours ago', color: 'bg-blue-500' },
    { category: 'User Insights', count: 89, lastUpdated: '1 hour ago', color: 'bg-green-500' },
    { category: 'System Logs', count: 234, lastUpdated: '30 mins ago', color: 'bg-yellow-500' },
    { category: 'Performance', count: 67, lastUpdated: '15 mins ago', color: 'bg-purple-500' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                OpenClaw Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'}`}>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Live</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? `border-blue-500 ${tab.color}`
                      : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'agent-data' && (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Agent Performance Dashboard
              </h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {agentStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          stat.change.includes('+') 
                            ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                            : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Real-time Activity */}
              <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Real-time Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      Processing user query: "Optimize dashboard performance"
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Just now
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      Generated analytics report for Q4 2024
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      2 minutes ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      Updated knowledge base with 47 new entries
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      5 minutes ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Task Management
              </h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Task
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {['Pending', 'In Progress', 'Completed'].map(status => (
                <div key={status} className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {status}
                  </h3>
                  <div className="space-y-3">
                    {tasks
                      .filter(task => task.status === status)
                      .map(task => (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
                        >
                          <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {task.title}
                          </h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className={`px-2 py-1 rounded ${
                              task.priority === 'High' 
                                ? 'bg-red-100 text-red-800' 
                                : task.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {task.priority}
                            </span>
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              {task.assignee}
                            </span>
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
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Knowledge Board
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {knowledgeItems.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.category}
                    </h3>
                  </div>
                  <p className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.count}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Updated {item.lastUpdated}
                  </p>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Insights
              </h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Performance Optimization Recommendations
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Based on recent analysis, implementing caching mechanisms could improve response times by 34%.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    User Behavior Patterns
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Peak usage hours are between 9-11 AM and 2-4 PM. Consider scaling resources during these periods.
                  </p>
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