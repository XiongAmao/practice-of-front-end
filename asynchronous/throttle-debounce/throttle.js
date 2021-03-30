function throttle(fn, wait, leading = true, trailing = true) {
  let timeout
  let last = 0
  return function() {
    clearTimeout(timeout)
    const exec = () => {
      fn.apply(this, arguments)
    }
    const elapsed = Date.now() - last

    if (elapsed > wait) {
      last = Date.now()
      if (leading) exec()
    } else {
      if (trailing) {
        timeout = setTimeout(() => {
          last = Date.now()
          exec()
        }, wait - elapsed)
      }
    }
  }
}