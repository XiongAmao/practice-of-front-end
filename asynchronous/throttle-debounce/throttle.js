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

const throttleWithDateCheck = (func, wait = 0, option = { leading: true, trailing: true }) => {
  let timer = null
  let lastArgs = null // 最后一次参数
  let remain = null // 剩余时间
  let lastExec = 0

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  return function (...args) {
    const elapsed = Date.now() - lastExec

    // 如果未开始
    if (remain === null && option.leading) {
      func.apply(this, args)
      lastExec = Date.now()
      remain = wait
    }
    // 如果未超时
    else if (elapsed < remain) {
      remain = wait - elapsed
      lastExec = Date.now()
      lastArgs = [this, args]
    }
    // 如果已经超时，直接执行
    else if (option.trailing) {
      remain = null
      lastArgs = null
      lastExec = Date.now()
      func.apply(this, args)
      return
    }

    clear()

    const timeout = () => {
      // 如果尾调，且有上一个参数
      if (option.trailing && lastArgs) {
        func.apply(lastArgs[0], lastArgs[1])
        lastArgs = null
        remain = wait
        timer = setTimeout(timeout, remain)
      } else {
        timer = null
        remain = null
        lastExec = Date.now()
      }
    }

    setTimeout(timeout, remain)
  }
}
