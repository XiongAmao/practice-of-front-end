function debounce(func, delay = 0, leading = false, trailing = true) {
  let timeout = null
  let lock = false
  return function(...args) {
    const exec = () => func.apply(this, args)
    clearTimeout(timeout)

    if (leading && !lock) {
      lock = true
      exec()
    }

    timeout = setTimeout(() => {
      if (trailing) exec()
      lock = false
    }, delay)
  }
}
