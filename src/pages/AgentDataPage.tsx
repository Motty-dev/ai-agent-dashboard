import { Activity, Zap, Clock } from 'lucide-react'
import { BotStatus } from '../components/BotStatus'

export default function AgentDataPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Activity className="text-blue-500" size={32} />
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Data</h1>
          <p className="text-gray-400">Monitor and manage your AI agents</p>
        </div>
      </div>

      {/* Real bot status + other metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <BotStatus />
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="text-yellow-500" size={24} />
            <h3 className="font-semibold">Today's Tokens</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-500">15.2K</p>
          <p className="text-sm text-gray-400">This session</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="text-blue-500" size={24} />
            <h3 className="font-semibold">Avg Response</h3>
          </div>
          <p className="text-3xl font-bold text-blue-500">1.2s</p>
          <p className="text-sm text-gray-400">Response time</p>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <div className="space-y-2 text-gray-400">
          <p>• Real-time agent status monitoring</p>
          <p>• Session management interface</p>
          <p>• Token usage analytics and charts</p>
          <p>• Performance metrics dashboard</p>
        </div>
      </div>
    </div>
  )
}