import { useState, useEffect } from 'react'

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)
    
    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Add listener
    if (media.addListener) {
      media.addListener(listener)
    } else {
      media.addEventListener('change', listener)
    }
    
    // Cleanup
    return () => {
      if (media.removeListener) {
        media.removeListener(listener)
      } else {
        media.removeEventListener('change', listener)
      }
    }
  }, [query])

  return matches
}

export default useMediaQuery

// Predefined breakpoints
export const useBreakpoints = () => {
  const isSm = useMediaQuery('(min-width: 640px)')
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const is2Xl = useMediaQuery('(min-width: 1536px)')
  
  const isMobile = !isMd
  const isTablet = isMd && !isLg
  const isDesktop = isLg
  
  return {
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isMobile,
    isTablet,
    isDesktop,
  }
}