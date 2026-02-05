import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, Flag, Trash2, Edit3, Clock } from 'lucide-react'
import { Task } from './TaskManager'

interface TaskCardProps {
  task: Task
  onDelete: (taskId: string) => void
  onUpdate: (taskId: string, updates: Partial<Task>) => void
  getPriorityColor: (priority: Task['priority']) => string
  getPriorityTextColor: (priority: Task['priority']) => string
  isOverdue: boolean
  daysUntilDue: number | null
  isDragging?: boolean
}

export function TaskCard({
  task,
  onDelete,
  onUpdate: _onUpdate,
  getPriorityColor,
  getPriorityTextColor,
  isOverdue,
  daysUntilDue,
  isDragging = false,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const getDueDateWarning = () => {
    if (task.status === 'done' || !task.dueDate) return null
    
    if (isOverdue) {
      return (
        <div className="flex items-center space-x-1 text-red-400 text-sm">
          <Clock size={12} />
          <span>Overdue</span>
        </div>
      )
    }
    
    if (daysUntilDue !== null && daysUntilDue <= 2) {
      return (
        <div className="flex items-center space-x-1 text-yellow-400 text-sm">
          <Clock size={12} />
          <span>Due {daysUntilDue === 0 ? 'today' : `in ${daysUntilDue}d`}</span>
        </div>
      )
    }
    
    return null
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`backdrop-blur-xl bg-gray-900/40 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'shadow-2xl shadow-blue-500/20' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
          <span className={`text-xs font-medium uppercase tracking-wide ${getPriorityTextColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Implement edit functionality
            }}
            className="p-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(task.id)
            }}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-medium mb-2 line-clamp-2">{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className="text-gray-400 text-sm mb-3 line-clamp-3">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          {task.dueDate && (
            <div className="flex items-center space-x-1 text-gray-400">
              <Calendar size={12} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          
          {task.completedAt && task.status === 'done' && (
            <div className="flex items-center space-x-1 text-green-400">
              <Flag size={12} />
              <span>Completed</span>
            </div>
          )}
        </div>

        {getDueDateWarning()}
      </div>

      {/* Progress indicator for 'In Progress' tasks */}
      {task.status === 'progress' && (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
            </div>
            <span className="text-xs text-gray-400">50%</span>
          </div>
        </div>
      )}
    </div>
  )
}