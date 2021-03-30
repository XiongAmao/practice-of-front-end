const inBrowser = typeof window !== 'undefined'

const root = (inBrowser ? window : global) as Window

let prev = Date.now()

function rafPolyfill(cb: FrameRequestCallback): number {
  const cur = Date.now()
  const ms = Math.max(0, 16 - (cur - prev))
  const id = setTimeout(cb, ms)
  prev = cur + ms
  return id
}

export function raf(fn: FrameRequestCallback): number {
  const requestAnimationFrame = root.requestAnimationFrame || rafPolyfill
  return requestAnimationFrame.call(root, fn)
}

export function cancelRaf(id: number) {
  const cancelRequestAnimationFrame = root.cancelAnimationFrame || root.clearTimeout
  cancelRequestAnimationFrame(id)
}
