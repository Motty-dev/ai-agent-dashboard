import { useState, useEffect } from 'react'

type ScrollDirection = 'up' | 'down' | null

interface UseScrollDirectionOptions {
  threshold?: number
  target?: EventTarget | null
}

function useScrollDirection({
  threshold = 10,
  target = null
}: UseScrollDirectionOptions = {}) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const targetElement = target || window
    let lastScrollY = targetElement === window 
      ? window.pageYOffset 
      : (targetElement as Element).scrollTop
    let ticking = false

    const updateScrollDirection = () => {
      const currentScrollY = targetElement === window 
        ? window.pageYOffset 
        : (targetElement as Element).scrollTop

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setScrollY(currentScrollY)
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    targetElement.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      targetElement.removeEventListener('scroll', onScroll)
    }
  }, [threshold, target])

  return { scrollDirection, scrollY }
}

export default useScrollDirection