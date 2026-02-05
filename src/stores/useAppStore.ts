import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AppState, Theme, User, Notification } from '@/types'

interface AppStore extends AppState {
  // Theme actions
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  
  // UI actions
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  setIsMobile: (isMobile: boolean) => void
  
  // User actions
  setUser: (user: User | null) => void
  setAuthenticated: (authenticated: boolean) => void
  updateUserSettings: (settings: Partial<User['settings']>) => void
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  removeNotification: (id: string) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  
  // Loading actions
  setLoading: (key: string, loading: boolean) => void
  clearLoading: () => void
  
  // Error actions
  setError: (key: string, error: string | null) => void
  clearErrors: () => void
  clearError: (key: string) => void
  
  // Reset actions
  reset: () => void
}

const initialState: AppState = {
  theme: 'light',
  sidebarCollapsed: false,
  isMobile: false,
  user: null,
  isAuthenticated: false,
  notifications: [],
  loading: {},
  errors: {},
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Theme actions
      setTheme: (theme: Theme) => {
        set({ theme })
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme)
      },
      
      // UI actions
      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed })
      },
      
      toggleSidebar: () => {
        set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }))
      },
      
      setIsMobile: (isMobile: boolean) => {
        set({ isMobile })
        // Auto-collapse sidebar on mobile
        if (isMobile) {
          set({ sidebarCollapsed: true })
        }
      },
      
      // User actions
      setUser: (user: User | null) => {
        set({ user })
      },
      
      setAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated })
        if (!isAuthenticated) {
          set({ user: null })
        }
      },
      
      updateUserSettings: (settings: Partial<User['settings']>) => {
        const user = get().user
        if (user) {
          set({
            user: {
              ...user,
              settings: { ...user.settings, ...settings }
            }
          })
        }
      },
      
      // Notification actions
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          read: false,
        }
        set(state => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50) // Keep only last 50
        }))
      },
      
      removeNotification: (id: string) => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
      },
      
      markNotificationRead: (id: string) => {
        set(state => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          )
        }))
      },
      
      clearNotifications: () => {
        set({ notifications: [] })
      },
      
      // Loading actions
      setLoading: (key: string, loading: boolean) => {
        set(state => ({
          loading: { ...state.loading, [key]: loading }
        }))
      },
      
      clearLoading: () => {
        set({ loading: {} })
      },
      
      // Error actions
      setError: (key: string, error: string | null) => {
        set(state => ({
          errors: { ...state.errors, [key]: error }
        }))
      },
      
      clearErrors: () => {
        set({ errors: {} })
      },
      
      clearError: (key: string) => {
        set(state => {
          const { [key]: _, ...rest } = state.errors
          return { errors: rest }
        })
      },
      
      // Reset actions
      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Initialize theme on app start
const initializeTheme = () => {
  const storedTheme = useAppStore.getState().theme
  if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Call initialization
if (typeof window !== 'undefined') {
  initializeTheme()
}