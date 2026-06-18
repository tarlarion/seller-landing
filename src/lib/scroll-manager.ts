type ScrollListener = () => void

const listeners = new Set<ScrollListener>()
let rafId: number | null = null
let isListening = false

function notifyScrollListeners() {
  rafId = null
  listeners.forEach((listener) => listener())
}

function handleScroll() {
  if (rafId !== null) return

  rafId = requestAnimationFrame(notifyScrollListeners)
}

export function subscribeScroll(listener: ScrollListener) {
  listeners.add(listener)

  if (!isListening) {
    isListening = true
    window.addEventListener("scroll", handleScroll, { passive: true })
  }

  listener()

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0) {
      isListening = false
      window.removeEventListener("scroll", handleScroll)

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  }
}

export function getScrollY() {
  return window.scrollY
}
