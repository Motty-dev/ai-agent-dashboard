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
    animated = false,
    disabled,
    children,
    ...props
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      danger: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
    }
    
    const sizes = {
      sm: 'h-8 rounded-md px-3 text-xs',
      md: 'h-9 px-4 py-2',
      lg: 'h-10 rounded-md px-8',
      xl: 'h-11 rounded-md px-8'
    }
    
    const isDisabled = disabled || loading
    
    const buttonContent = (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    )
    
    if (animated) {
      return (
        <motion.button
          ref={ref}
          className={cn(
            baseClasses,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            className
          )}
          disabled={isDisabled}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type={props.type || 'button'}
          onClick={props.onClick}
        >
          {buttonContent}
        </motion.button>
      )
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }