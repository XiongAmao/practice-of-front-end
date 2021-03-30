import { raf , cancelRaf } from '../requestAnimationFrame/index'

// demo
export function useTouchEvents() {
  let ticking = false
  let rafId: number

  const onStart = (e: TouchEvent) => {
    // start
  }
  const onMove = (e: TouchEvent) => {
    if (ticking) return
    rafId = raf(() => {
      // do a lot things
      ticking = false
    })
  }
  const onEnd = (e: TouchEvent) => {
    cancelRaf(rafId)
    // ending
  }

  return {
    onMove,
    onStart,
    onEnd
  }
}
