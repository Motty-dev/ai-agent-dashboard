import { useState, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus, Flag } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { TaskColumn } from './TaskColumn'
import { AddTaskModal } from './AddTaskModal'

export interface Task {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'progress' | 'done'
  dueDate?: string
  createdAt: string
  completedAt?: string
}

interface TaskData {
  tasks: Task[]
  lastUpdated: string
}

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'gray' },
  { id: 'progress', title: 'In Progress', color: 'blue' },
  { id: 'done', title: 'Done', color: 'green' },
] as const

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high': return 'bg-red-500'
    case 'medium': return 'bg-yellow-500'
    case 'low': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

const getPriorityTextColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high': return 'text-red-400'
    case 'medium': return 'text-yellow-400'
    case 'low': return 'text-green-400'
    default: return 'text-gray-400'
  }
}

const isOverdue = (dueDate?: string) => {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

const getDaysUntilDue = (dueDate?: string) => {
  if (!dueDate) return null
  const days = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  return days
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  )

  const fetchTasks = async () => {
    try {
      const response = await fetch('/ai-agent-dashboard/api/tasks.json')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const data: TaskData = await response.json()
      setTasks(data.tasks || [])
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      // Initialize with empty tasks if fetch fails
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const saveTasks = async (updatedTasks: Task[]) => {
    // Update local state immediately for better UX
    setTasks(updatedTasks)
    
    try {
      // In a real implementation, this would POST to an API endpoint
      // For now, we'll update via the script during the next build
      console.log('Tasks updated:', updatedTasks.length)
    } catch (error) {
      console.error('Failed to save tasks:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && task.status !== newStatus) {
        const updatedTask = { 
          ...task, 
          status: newStatus,
          completedAt: newStatus === 'done' ? new Date().toISOString() : undefined
        }
        return updatedTask
      }
      return task
    })

    saveTasks(updatedTasks)
  }

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'todo',
      createdAt: new Date().toISOString(),
    }

    const updatedTasks = [...tasks, newTask]
    saveTasks(updatedTasks)
  }

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    saveTasks(updatedTasks)
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    )
    saveTasks(updatedTasks)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-8 border border-gray-700/50">
          <div className="text-gray-400 text-center">Loading tasks...</div>
        </div>
      </div>
    )
  }

  const getTasksByStatus = (status: Task['status']) => 
    tasks.filter(task => task.status === status)

  const stats = {
    total: tasks.length,
    todo: getTasksByStatus('todo').length,
    progress: getTasksByStatus('progress').length,
    done: getTasksByStatus('done').length,
    overdue: tasks.filter(task => task.status !== 'done' && isOverdue(task.dueDate)).length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Flag className="text-blue-500" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-white">Task Manager</h1>
            <p className="text-gray-400">Organize and track your tasks</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Tasks</div>
          </div>
        </div>
        
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">{stats.todo}</div>
            <div className="text-sm text-gray-400">To Do</div>
          </div>
        </div>
        
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.progress}</div>
            <div className="text-sm text-gray-400">In Progress</div>
          </div>
        </div>
        
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{stats.done}</div>
            <div className="text-sm text-gray-400">Done</div>
          </div>
        </div>
        
        <div className="backdrop-blur-xl bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{stats.overdue}</div>
            <div className="text-sm text-gray-400">Overdue</div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map(column => {
            const columnTasks = getTasksByStatus(column.id as Task['status'])
            
            return (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                color={column.color}
                count={columnTasks.length}
              >
                <SortableContext
                  items={columnTasks.map(task => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {columnTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={deleteTask}
                        onUpdate={updateTask}
                        getPriorityColor={getPriorityColor}
                        getPriorityTextColor={getPriorityTextColor}
                        isOverdue={isOverdue(task.dueDate)}
                        daysUntilDue={getDaysUntilDue(task.dueDate)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </TaskColumn>
            )
          })}
        </div>

        <DragOverlay>
          {activeTask && (
            <TaskCard
              task={activeTask}
              onDelete={() => {}}
              onUpdate={() => {}}
              getPriorityColor={getPriorityColor}
              getPriorityTextColor={getPriorityTextColor}
              isOverdue={isOverdue(activeTask.dueDate)}
              daysUntilDue={getDaysUntilDue(activeTask.dueDate)}
              isDragging
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addTask}
      />
    </div>
  )
}