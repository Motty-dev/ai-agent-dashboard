import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  animated?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    animated = true,
    disabled,
    children,
    ...props
  }, ref) => {
    const baseClasses = cn(
      // Base styles
      'inline-flex items-center justify-center',
      'font-medium rounded-xl',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'transition-all duration-200',
      'tap-highlight-none touch-manipulation',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-[0.98]',
      
      // Size variants
      {
        'px-3 py-2 text-sm gap-2 h-9': size === 'sm',
        'px-4 py-2.5 text-sm gap-2 h-10': size === 'md',
        'px-6 py-3 text-base gap-3 h-12': size === 'lg',
        'px-8 py-4 text-lg gap-3 h-14': size === 'xl',
      },
      
      // Variant styles
      {
        // Primary
        'bg-primary-600 text-white shadow-sm': variant === 'primary',
        'hover:bg-primary-700 active:bg-primary-800': variant === 'primary' && !disabled,
        'focus-visible:ring-primary-500': variant === 'primary',
        
        // Secondary
        'bg-gray-100 text-gray-900 shadow-sm': variant === 'secondary',
        'dark:bg-dark-elevated dark:text-dark-text': variant === 'secondary',
        'hover:bg-gray-200 dark:hover:bg-gray-700': variant === 'secondary' && !disabled,
        'focus-visible:ring-gray-500': variant === 'secondary',
        
        // Ghost
        'text-gray-700 dark:text-dark-text': variant === 'ghost',
        'hover:bg-gray-100 dark:hover:bg-dark-elevated': variant === 'ghost' && !disabled,
        'focus-visible:ring-gray-500': variant === 'ghost',
        
        // Danger
        'bg-red-600 text-white shadow-sm': variant === 'danger',
        'hover:bg-red-700 active:bg-red-800': variant === 'danger' && !disabled,
        'focus-visible:ring-red-500': variant === 'danger',
        
        // Outline
        'border border-gray-300 text-gray-700': variant === 'outline',
        'dark:border-dark-border dark:text-dark-text': variant === 'outline',
        'hover:bg-gray-50 dark:hover:bg-dark-elevated': variant === 'outline' && !disabled,
        'focus-visible:ring-gray-500': variant === 'outline',
      },
      
      // Full width
      fullWidth && 'w-full',
      
      className
    )

    const ButtonContent = () => (
      <>
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {leftIcon && !loading && leftIcon}
        {children}
        {rightIcon && !loading && rightIcon}
      </>
    )

    if (animated) {
      return (
        <motion.button
          ref={ref}
          className={baseClasses}
          disabled={disabled || loading}
          whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
          whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          {...props}
        >
          <ButtonContent />
        </motion.button>
      )
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        <ButtonContent />
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button