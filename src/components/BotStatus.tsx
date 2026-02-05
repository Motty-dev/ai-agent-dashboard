import { useState, useEffect } from 'react'
import { Bot, Cpu, Database, Activity } from 'lucide-react'

interface BotStatusData {
  model: string
  contextUsed: number
  contextLimit: number
  activeSessions: number
  memoryFiles: number
  status: 'active' | 'idle' | 'busy'
}

export function BotStatus() {
  const [status, setStatus] = useState<BotStatusData>({
    model: 'Claude Sonnet 4',
    contextUsed: 15000,
    contextLimit: 40000,
    activeSessions: 1,
    memoryFiles: 3,
    status: 'active'
  })

  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // TODO: Replace with actual API calls to sessions_list, session_status
    const interval = setInterval(() => {
      // Simulated real-time updates for now
      setStatus(prev => ({
        ...prev,
        contextUsed: prev.contextUsed + Math.floor(Math.random() * 100),
        lastUpdated: new Date()
      }))
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const contextPercentage = Math.round((status.contextUsed / status.contextLimit) * 100)
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500'
      case 'busy': return 'text-yellow-500'
      case 'idle': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Bot className="text-blue-500" size={24} />
          <h3 className="font-semibold text-white">Bot Status</h3>
        </div>
        <div className={`flex items-center space-x-2 ${getStatusColor(status.status)}`}>
          <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
          <span className="text-sm capitalize">{status.status}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Model Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="text-purple-500" size={16} />
            <span className="text-sm text-gray-400">Model</span>
          </div>
          <span className="text-sm text-white font-medium">{status.model}</span>
        </div>

        {/* Context Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Database className="text-yellow-500" size={16} />
              <span className="text-sm text-gray-400">Context</span>
            </div>
            <span className="text-sm text-white font-medium">
              {status.contextUsed.toLocaleString()} / {status.contextLimit.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(contextPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{contextPercentage}% used</div>
        </div>

        {/* Active Sessions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="text-green-500" size={16} />
            <span className="text-sm text-gray-400">Sessions</span>
          </div>
          <span className="text-sm text-white font-medium">{status.activeSessions} active</span>
        </div>

        {/* Memory Files */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="text-blue-500" size={16} />
            <span className="text-sm text-gray-400">Memory Files</span>
          </div>
          <span className="text-sm text-white font-medium">{status.memoryFiles} loaded</span>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-700/50">
          Updated {lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}