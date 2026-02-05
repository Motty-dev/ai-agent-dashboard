import React from 'react'
import { Activity, Server, Zap, Clock } from 'lucide-react'

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

      {/* Placeholder cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <Server className="text-green-500" size={24} />
            <h3 className="font-semibold">Active Agents</h3>
          </div>
          <p className="text-3xl font-bold text-green-500">12</p>
          <p className="text-sm text-gray-400">Currently running</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="text-yellow-500" size={24} />
            <h3 className="font-semibold">Token Usage</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-500">2.4M</p>
          <p className="text-sm text-gray-400">This month</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="text-blue-500" size={24} />
            <h3 className="font-semibold">Avg Response</h3>
          </div>
          <p className="text-3xl font-bold text-blue-500">234ms</p>
          <p className="text-sm text-gray-400">Response time</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="text-purple-500" size={24} />
            <h3 className="font-semibold">Sessions</h3>
          </div>
          <p className="text-3xl font-bold text-purple-500">89</p>
          <p className="text-sm text-gray-400">Active sessions</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
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