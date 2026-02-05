import { useEffect, useRef } from 'react'

function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenerOptions?: AddEventListenerOptions
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside, listenerOptions)
    document.addEventListener('touchstart', handleClickOutside, listenerOptions)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, listenerOptions)
      document.removeEventListener('touchstart', handleClickOutside, listenerOptions)
    }
  }, [handler, listenerOptions])

  return ref
}

export default useClickOutside