function LazyMan(str) {
  const queue = []

  const next = () => {
    const task = queue.shift()
    if (task) { task() }
  }

  const addSleepTask = (time, isFirst = true) => {
    const task = () => {
      setTimeout(() => {
        next()
      }, time * 1000)
    }

    if (isFirst) {
      queue.unshift(task)
    } else {
      queue.push(task)
    }
  }

  const addLog = (text) => {
    queue.push(() => {
      console.log(text)
      next()
    })
  }

  function lazy(text) {
    addLog(text)
    setTimeout(() => {
      next()
    }, 0)
  }

  lazy.prototype.sleep = function (delay) {
    addSleepTask(delay, false)
    return this
  }
  lazy.prototype.firstSleep = function (delay) {
    addSleepTask(delay)
    return this
  }
  lazy.prototype.write = function (text) {
    addLog(text)
    return this
  }

  return new lazy(str)
}
