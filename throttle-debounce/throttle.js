function throttle (func, wait, trailing = true) {
  let timeout
  let last = 0

  return function (...args) {
    clearTimeout(timeout)
    const exec = () => {
      func.apply(this, args)
      last = Date.now()
    }
    const elapsed = Date.now() - last

    if (elapsed >= wait) {
      exec()
    } else {
      if (trailing) {
        setTimeout(() => {
          exec()
        }, elapsed - wait)
      }
    }
  }
}