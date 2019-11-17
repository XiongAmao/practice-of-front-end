// 触发频繁的事件合并成一次执行
export function debounce(
  func: (...args: any[]) => void,
  delay: number,
  leading = false,
  trailing = true
) {
  let timeout: NodeJS.Timeout | null = null
  let lock = false

  return function(...args) {
    const exec = () => func.apply(this, args)

    clearTimeout(timeout)

    if (leading && !lock) {
      exec()
      lock = true
    }

    timeout = setTimeout(() => {
      if (trailing) exec()
      lock = false
    }, delay)
  }
}
