import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { TrendingUp, Zap, Target, Clock } from 'lucide-react'

interface TokenAnalyticsData {
  contextUsage: Array<{ time: string; context: number }>
  apiCalls: Array<{ time: string; calls: number }>
  taskProgress: {
    completed: number
    total: number
    percentage: number
  }
  summary: {
    totalTokensToday: number
    avgContextUsage: number
    peakApiHour: string
    efficiency: number
  }
  generated: string
  dataSource: string
}

const formatTime = (timeStr: string) => {
  try {
    const date = new Date(timeStr)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  } catch {
    return timeStr
  }
}

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const getContextColor = (usage: number) => {
  if (usage < 50) return '#10B981' // green
  if (usage < 75) return '#F59E0B' // yellow
  return '#EF4444' // red
}

const getEfficiencyColor = (efficiency: number) => {
  if (efficiency >= 80) return '#10B981'
  if (efficiency >= 60) return '#F59E0B'
  return '#EF4444'
}

export function TokenAnalytics() {
  const [data, setData] = useState<TokenAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTokenStats = async () => {
    try {
      const response = await fetch('/ai-agent-dashboard/api/token-stats.json')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const statsData = await response.json()
      setData(statsData)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch token stats:', err)
      setError('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenStats()
    const interval = setInterval(fetchTokenStats, 60000) // Refresh every 60 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-8 border border-gray-700/50">
          <div className="text-gray-400 text-center">Loading analytics...</div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-6 space-y-6">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-8 border border-gray-700/50">
          <div className="text-red-400 text-center">{error || 'No data available'}</div>
        </div>
      </div>
    )
  }

  const progressData = [
    { name: 'Completed', value: data.taskProgress.completed, color: '#10B981' },
    { name: 'Remaining', value: data.taskProgress.total - data.taskProgress.completed, color: '#374151' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <TrendingUp className="text-green-500" size={32} />
        <div>
          <h1 className="text-2xl font-bold text-white">Token Analytics</h1>
          <p className="text-gray-400">Performance metrics and usage insights</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="text-blue-500" size={24} />
            <h3 className="font-semibold">Total Tokens</h3>
          </div>
          <p className="text-3xl font-bold text-blue-500">{formatNumber(data.summary.totalTokensToday)}</p>
          <p className="text-sm text-gray-400">Today's usage</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="text-orange-500" size={24} />
            <h3 className="font-semibold">Avg Context</h3>
          </div>
          <p className="text-3xl font-bold" style={{ color: getContextColor(data.summary.avgContextUsage) }}>
            {data.summary.avgContextUsage}%
          </p>
          <p className="text-sm text-gray-400">Context usage</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="text-purple-500" size={24} />
            <h3 className="font-semibold">Peak Hour</h3>
          </div>
          <p className="text-3xl font-bold text-purple-500">{data.summary.peakApiHour}</p>
          <p className="text-sm text-gray-400">Busiest time</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="text-green-500" size={24} />
            <h3 className="font-semibold">Efficiency</h3>
          </div>
          <p className="text-3xl font-bold" style={{ color: getEfficiencyColor(data.summary.efficiency) }}>
            {data.summary.efficiency}%
          </p>
          <p className="text-sm text-gray-400">Performance</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Context Usage Chart */}
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="text-orange-500 mr-3" size={20} />
            Context Usage Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.contextUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  tickFormatter={formatTime}
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  domain={[0, 100]}
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip 
                  labelFormatter={(label) => formatTime(label)}
                  formatter={(value: number) => [`${value}%`, 'Context Usage']}
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="context" 
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#F59E0B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Calls Chart */}
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="text-blue-500 mr-3" size={20} />
            API Calls Per Hour
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.apiCalls}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  tickFormatter={formatTime}
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip 
                  labelFormatter={(label) => formatTime(label)}
                  formatter={(value: number) => [value, 'API Calls']}
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="calls" 
                  fill="#3B82F6"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Task Progress */}
      <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Target className="text-green-500 mr-3" size={20} />
          Tasks Completed Today
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Progress Ring */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">
                    {data.taskProgress.percentage}%
                  </div>
                  <div className="text-sm text-gray-400">Complete</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Completed Tasks</span>
              <span className="text-2xl font-bold text-green-500">{data.taskProgress.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Remaining Tasks</span>
              <span className="text-2xl font-bold text-gray-400">{data.taskProgress.total - data.taskProgress.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Tasks</span>
              <span className="text-2xl font-bold text-white">{data.taskProgress.total}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{data.taskProgress.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${data.taskProgress.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Source Info */}
      <div className="text-center text-xs text-gray-500">
        Data updated: {new Date(data.generated).toLocaleString()} • 
        Source: {data.dataSource} • Auto-refreshes every 60 seconds
      </div>
    </div>
  )
}