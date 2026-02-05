import { useState, useEffect } from 'react'
import { X, Plus, Calendar, Flag, AlignLeft } from 'lucide-react'
import { Task } from './TaskManager'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void
}

export function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    dueDate: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      })
      setErrors({})
    }
  }, [isOpen])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = 'Due date cannot be in the past'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onAdd({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
    })

    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white'
      case 'medium': return 'bg-yellow-500 text-black'
      case 'low': return 'bg-green-500 text-white'
    }
  }

  const getPriorityBorder = (priority: Task['priority'], isSelected: boolean) => {
    if (!isSelected) return 'border-gray-600 hover:border-gray-500'
    
    switch (priority) {
      case 'high': return 'border-red-500'
      case 'medium': return 'border-yellow-500'
      case 'low': return 'border-green-500'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 backdrop-blur-xl bg-gray-900/90 rounded-xl border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <Plus className="text-blue-500" size={24} />
            <h2 className="text-xl font-semibold text-white">Add New Task</h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
              <Flag size={16} />
              <span>Title *</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title..."
              className={`w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
              }`}
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
              <AlignLeft size={16} />
              <span>Description</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter task description..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
              <Flag size={16} />
              <span>Priority</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['high', 'medium', 'low'] as const).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => handleChange('priority', priority)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                    getPriorityBorder(priority, formData.priority === priority)
                  } ${
                    formData.priority === priority ? 'bg-gray-800' : 'bg-gray-800/50 hover:bg-gray-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${getPriorityColor(priority).split(' ')[0]}`} />
                  <span className="text-sm font-medium text-white capitalize">{priority}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
              <Calendar size={16} />
              <span>Due Date</span>
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.dueDate ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
              }`}
            />
            {errors.dueDate && (
              <p className="text-red-400 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}