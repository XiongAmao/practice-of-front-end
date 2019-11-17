// 每x秒恒定执行
export function throttle(func: (...args: any[]) => void, wait: number = 0, trailing = true) {
  let last = Date.now()
  let timeout: NodeJS.Timeout | null = null

  return function(...args) {
    clearTimeout(timeout)
    timeout = null
    const elapsed = Date.now() - last

    const exec = () => {
      func.apply(this, args)
      last = Date.now()
    }

    if (elapsed >= wait) {
      exec()
    } else {
      if (trailing) timeout = setTimeout(exec, wait)
    }
  }
}
