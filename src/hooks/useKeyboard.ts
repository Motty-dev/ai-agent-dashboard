import { useEffect, useRef } from 'react'

interface UseKeyboardOptions {
  preventDefault?: boolean
  stopPropagation?: boolean
  target?: EventTarget | null
}

function useKeyboard(
  key: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: UseKeyboardOptions = {}
) {
  const { preventDefault = false, stopPropagation = false, target = null } = options
  const handlerRef = useRef(handler)

  // Update handler ref when handler changes
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = target || window
    const keys = Array.isArray(key) ? key : [key]

    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if any of the specified keys match
      const keyMatches = keys.some(k => {
        // Handle special keys
        if (k === 'cmd' || k === 'meta') return event.metaKey
        if (k === 'ctrl') return event.ctrlKey
        if (k === 'shift') return event.shiftKey
        if (k === 'alt') return event.altKey
        if (k === 'escape') return event.key === 'Escape'
        if (k === 'enter') return event.key === 'Enter'
        if (k === 'space') return event.key === ' '
        if (k === 'tab') return event.key === 'Tab'
        if (k === 'backspace') return event.key === 'Backspace'
        if (k === 'delete') return event.key === 'Delete'
        
        // Handle key combinations like 'cmd+k'
        if (k.includes('+')) {
          const parts = k.toLowerCase().split('+')
          return parts.every(part => {
            switch (part) {
              case 'cmd':
              case 'meta':
                return event.metaKey
              case 'ctrl':
                return event.ctrlKey
              case 'shift':
                return event.shiftKey
              case 'alt':
                return event.altKey
              default:
                return event.key.toLowerCase() === part
            }
          })
        }
        
        // Regular key match
        return event.key.toLowerCase() === k.toLowerCase()
      })

      if (keyMatches) {
        if (preventDefault) {
          event.preventDefault()
        }
        if (stopPropagation) {
          event.stopPropagation()
        }
        handlerRef.current(event)
      }
    }

    targetElement.addEventListener('keydown', handleKeyPress as EventListener)

    return () => {
      targetElement.removeEventListener('keydown', handleKeyPress as EventListener)
    }
  }, [key, preventDefault, stopPropagation, target])
}

export default useKeyboard