import { useState, useEffect } from 'react'
import { GitCommit, Terminal, FileText, Brain, Clock } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'git' | 'command' | 'file' | 'memory'
  title: string
  description: string
  timestamp: string
  details?: string
}

const getIcon = (type: string) => {
  switch (type) {
    case 'git': return <GitCommit className="text-green-500" size={16} />
    case 'command': return <Terminal className="text-blue-500" size={16} />
    case 'file': return <FileText className="text-purple-500" size={16} />
    case 'memory': return <Brain className="text-orange-500" size={16} />
    default: return <Clock className="text-gray-500" size={16} />
  }
}

const formatTimeAgo = (timestamp: string) => {
  const now = Date.now()
  const time = new Date(timestamp).getTime()
  const diff = now - time
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const fetchActivity = async () => {
    try {
      const response = await fetch('/ai-agent-dashboard/api/activity.json')
      const data = await response.json()
      setActivities(data.activities || [])
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch activity:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivity()
    const interval = setInterval(fetchActivity, 60000) // Refresh every 60 seconds
    return () => clearInterval(interval)
  }, [])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  if (loading) {
    return (
      <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="text-blue-500" size={24} />
          <h2 className="text-xl font-semibold">Activity Feed</h2>
        </div>
        <div className="text-gray-400">Loading activity...</div>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Activity Feed</h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-gray-400 text-center py-8">No recent activity</div>
        ) : (
          activities.map((item) => (
            <div 
              key={item.id}
              className="backdrop-blur-sm bg-gray-800/20 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200 cursor-pointer"
              onClick={() => toggleExpanded(item.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(item.type)}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white truncate">{item.title}</h4>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  
                  {expandedItems.has(item.id) && item.details && (
                    <div className="mt-3 p-3 bg-gray-800/40 rounded border border-gray-700/40">
                      <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                        {item.details}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="text-xs text-gray-500 text-center">
          Auto-refreshes every 60 seconds
        </div>
      </div>
    </div>
  )
}