import { CheckSquare, Plus, Calendar, User, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function TasksPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckSquare className="text-green-500" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-white">Task Management</h1>
            <p className="text-gray-400">Organize and track your AI workflows</p>
          </div>
        </div>
        
        <Button variant="primary" leftIcon={<Plus size={16} />}>
          New Task
        </Button>
      </div>

      {/* Task stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <CheckSquare className="text-green-500" size={24} />
            <h3 className="font-semibold">Completed</h3>
          </div>
          <p className="text-3xl font-bold text-green-500">24</p>
          <p className="text-sm text-gray-400">This week</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="text-blue-500" size={24} />
            <h3 className="font-semibold">In Progress</h3>
          </div>
          <p className="text-3xl font-bold text-blue-500">8</p>
          <p className="text-sm text-gray-400">Active tasks</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="text-orange-500" size={24} />
            <h3 className="font-semibold">Overdue</h3>
          </div>
          <p className="text-3xl font-bold text-orange-500">3</p>
          <p className="text-sm text-gray-400">Need attention</p>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-purple-500" size={24} />
            <h3 className="font-semibold">Assigned</h3>
          </div>
          <p className="text-3xl font-bold text-purple-500">12</p>
          <p className="text-sm text-gray-400">To agents</p>
        </div>
      </div>

      {/* Kanban board placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-300">To Do</h3>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">5</span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-white mb-2">Sample Task {i}</h4>
                <p className="text-sm text-gray-400 mb-3">Task description placeholder</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-blue-600 px-2 py-1 rounded text-white">High</span>
                  <span className="text-gray-500">Due: 2 days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-300">In Progress</h3>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">3</span>
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium text-white mb-2">Active Task {i}</h4>
                <p className="text-sm text-gray-400 mb-3">Currently being processed</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-orange-600 px-2 py-1 rounded text-white">Medium</span>
                  <span className="text-gray-500">50% done</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-300">Completed</h3>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">8</span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700 opacity-75">
                <h4 className="font-medium text-white mb-2">Done Task {i}</h4>
                <p className="text-sm text-gray-400 mb-3">Successfully completed</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-green-600 px-2 py-1 rounded text-white">Done</span>
                  <span className="text-gray-500">✓ Complete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <div className="space-y-2 text-gray-400">
          <p>• Drag-and-drop task management (Kanban board)</p>
          <p>• Task assignment to specific agents</p>
          <p>• Progress tracking and analytics</p>
          <p>• Deadline management and notifications</p>
          <p>• Collaborative comments and file attachments</p>
        </div>
      </div>
    </div>
  )
}