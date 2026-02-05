// Theme types
export type Theme = 'light' | 'dark'

// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  settings: UserSettings
}

export interface UserSettings {
  theme: Theme
  notifications: boolean
  emailUpdates: boolean
  language: string
  timezone: string
}

// Navigation types
export interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  path: string
  badge?: number
  children?: NavItem[]
}

// Dashboard types
export interface DashboardStats {
  totalProjects: number
  completedTasks: number
  pendingTasks: number
  teamMembers: number
  revenue: number
  growth: number
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold' | 'cancelled'
  progress: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate: string
  team: TeamMember[]
  tasks: Task[]
  color: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee?: TeamMember
  dueDate?: string
  tags: string[]
  projectId: string
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  department: string
  isOnline: boolean
  lastSeen: string
}

// Analytics types
export interface AnalyticsData {
  period: 'day' | 'week' | 'month' | 'year'
  data: Array<{
    date: string
    value: number
    label?: string
  }>
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    fill?: boolean
  }>
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

// API types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  meta?: {
    page: number
    limit: number
    total: number
  }
}

export interface ApiError {
  message: string
  code?: string
  statusCode: number
}

// Component types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface IconProps {
  size?: number
  className?: string
  color?: string
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  validation?: Record<string, any>
  options?: Array<{ label: string; value: string }>
}

// Modal types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
}

// Loading states
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// Device types for responsive design
export type DeviceType = 'mobile' | 'tablet' | 'desktop'
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Animation types
export type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'slideLeft' | 'slideRight'

export interface AnimationConfig {
  variant: AnimationVariant
  duration?: number
  delay?: number
  staggerChildren?: number
}

// Store types
export interface AppState {
  // UI state
  theme: Theme
  sidebarCollapsed: boolean
  isMobile: boolean
  
  // User state
  user: User | null
  isAuthenticated: boolean
  
  // App state
  notifications: Notification[]
  loading: Record<string, boolean>
  errors: Record<string, string | null>
}