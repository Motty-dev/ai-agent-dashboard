import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

interface TaskColumnProps {
  id: string
  title: string
  color: string
  count: number
  children: ReactNode
}

const getColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        dot: 'bg-blue-500',
      }
    case 'green':
      return {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        dot: 'bg-green-500',
      }
    case 'gray':
    default:
      return {
        bg: 'bg-gray-500/10',
        border: 'border-gray-500/30',
        text: 'text-gray-400',
        dot: 'bg-gray-500',
      }
  }
}

export function TaskColumn({ id, title, color, count, children }: TaskColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })

  const colors = getColorClasses(color)
  
  return (
    <div
      ref={setNodeRef}
      className={`backdrop-blur-xl bg-gray-900/30 rounded-xl border transition-all duration-300 ${
        isOver
          ? `${colors.bg} ${colors.border} shadow-lg`
          : 'border-gray-700/50 hover:border-gray-600/50'
      }`}
    >
      {/* Column Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
            {count}
          </div>
        </div>
      </div>

      {/* Column Content */}
      <div className="p-4 min-h-[200px]">
        {children}
        
        {/* Empty state */}
        {count === 0 && (
          <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800 flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full ${colors.dot} opacity-30`} />
              </div>
              <p>No tasks in {title.toLowerCase()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}