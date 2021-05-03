function throttleWithDate(fn, wait, leading = true, trailing = true) {
  let timeout
  let last = 0
  return function () {
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

// https://bigfrontend.dev/problem/implement-basic-throttle
// leading = true ，leading 调用完后，如果冷却未结束调用，就触发最后一次trailing
function basicThrottle(func, wait = 0) {
  let timer = null
  let lastArgs = null

  return function (...args) {
    if (timer !== null) {
      lastArgs = [this, args]
    } else {
      func.apply(this, args)
      timer = setTimeout(() => {
        if (lastArgs) func.apply(lastArgs[0], lastArgs[1])
        timer = null
        lastArgs = null
      }, wait)
    }
  }
}

function basicThrottleWithClosure(func, wait = 0) {
  let timer = null
  let invoke = () => {}

  return function (...args) {
    invoke = () => {
      func.apply(this, args)
      invoke = () => {}
    }
    if (timer === null) {
      invoke()
      timer = setTimeout(() => {
        invoke()
        timer = null
      }, wait)
    }
  }
}

// https://bigfrontend.dev/problem/implement-throttle-with-leading-and-trailing-option

function throttle(
  func,
  wait = 0,
  option = {
    leading: true,
    trailing: true
  }
) {
  let timer = null
  let lastArgs = null

  return function (...args) {
    if (timer !== null) {
      lastArgs = [this, args]
      return
    }

    if (options.leading) {
      func.apply(this, args)
    } else {
      lastArgs = [this, args]
    }

    const timeout = () => {
      if (option.trailing && lastArgs !== null) {
        func.apply(lastArgs[0], lastArgs[1])
        lastArgs = null
        timer = setTimeout(timeout, wait)
      } else {
        timer = null
      }
    }

    timer = setTimeout(timeout, wait)
  }
}
