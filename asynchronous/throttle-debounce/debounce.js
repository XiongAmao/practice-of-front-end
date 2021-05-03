// https://bigfrontend.dev/problem/implement-basic-debounce
// by default { leading: false, trailing = true }
function simpleDebounce(func, wait = 0) {
  let timer = false
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait);
  }
}

// https://bigfrontend.dev/problem/implement-debounce-with-leading-and-trailing-option
function debounce(
  func,
  wait = 0,
  option = {
    // default
    leading: false,
    trailing: true
  }
) {
  const { leading, trailing } = option
  let timer = null

  return function (...args) {
    // invoked 控制leading=true 且冷却中只调用一次的情况
    let isInvoked = false
    const invoke = () => func.apply(this, args)
    
    // timer 判断是否已 leading
    if (leading && timer === null) {
      invoke()
      // 冷却内，第二次调用时，则会当前invoked重置为false，当冷却结束时会invoke
      isInvoked = true
    }

    // 需要排在leading后
    clearTimeout(timer)

    timer = setTimeout(() => {
      if (trailing && !isInvoked) invoke()
      timer = null
    }, wait)
  }
}
