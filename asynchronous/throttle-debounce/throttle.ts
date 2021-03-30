// 每x秒恒定执行
export function throttle(
  func: (...args: any[]) => void,
  wait: number = 0,
  leading = true,
  trailing = true
) {
  let last = Date.now()
  let timeout: NodeJS.Timeout | null = null

  return function(...args) {
    clearTimeout(timeout)
    timeout = null
    const elapsed = Date.now() - last

    const exec = () => {
      func.apply(this, args)
    }

    if (elapsed >= wait) {
      last = Date.now()
      if (leading) exec()
    } else {
      if (trailing)
        timeout = setTimeout(() => {
          last = Date.now()
          exec()
        }, wait - elapsed)
    }
  }
}
