const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isObject = (obj) => obj !== null && typeof obj === 'object'
const isFunction = (fn) => typeof fn === 'function'
const isPromise = (p) => p instanceof Promise
const isThenable = (obj) =>
  (isObject(obj) || isFunction(obj)) && 'then' in obj && isFunction(obj.then)
const isIterable = (obj) => isObject(obj) && isFunction(obj[Symbol.iterator])

class Promise {
  constructor(fn) {
    this.state = PENDING
    this.result = null
    this.callbacks = []

    let done = false

    const onFulfilled = (value) => transition(this, FULFILLED, value)
    const onRejected = (reason) => transition(this, REJECTED, reason)

    const resolve = (value) => {
      if (done) return
      done = true
      resolvePromise(this, value, onFulfilled, onRejected)
    }

    const reject = (reason) => {
      if (done) return
      done = true
      onRejected(reason)
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // 2.2.7 then方法必须返回一个Promise
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      const callback = { resolve, reject, onFulfilled, onRejected }

      if (this.state === PENDING) {
        this.callbacks.push(callback)
      } else {
        // 2.2.4 / 3.1
        // 通过js实现，无法修改调用栈，这里通过setTimeout实现异步调用
        runAsync(() => handleCallback(callback, this.state, this.result))
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onFinally) {
    return this.then(
      (res) => Promise.resolve(onFinally()).then(() => res),
      (err) =>
        Promise.resolve(onFinally()).then(() => {
          throw err
        })
    )
  }

  // implement es6
  static resolve(value) {
    if (isPromise(value)) return value
    if (isThenable(value)) return new Promise((resolve, reject) => value.then(resolve, reject))
    return new Promise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new Promise((_, reject) => reject(reason))
  }

  static all(iterable) {
    if (!isIterable(iterable)) {
      throw new TypeError(iterable + 'is not iterable')
    }

    const results = []
    let count = 0
    let done = false

    return new Promise((resolve, reject) => {
      for (const p of iterable) {
        if (done) return
        const i = count++

        Promise.resolve(p).then(
          (result) => {
            count--
            results[i] = result
            if (count === 0) resolve(results)
          },
          (error) => {
            if (done) return
            done = true
            reject(error)
          }
        )
      }
      // 堆栈中为空，则立即返回
      if (count === 0) resolve(iterable)
    })
  }

  static race(iterable) {
    if (!isIterable(iterable)) {
      throw new TypeError(iterable + 'is not iterable')
    }
    let done = false

    return new Promise((resolve, reject) => {
      for (const p of iterable) {
        Promise.resolve(p).then(
          (result) => {
            if (done) return
            done = true
            resolve(result)
          },
          (error) => {
            if (done) return
            done = true
            reject(error)
          }
        )
      }
    })
  }

  static allSettled(iterable) {
    if (!isIterable(iterable)) {
      throw new TypeError(iterable + 'is not iterable')
    }

    const results = []
    let count = 0

    return new Promise((resolve, reject) => {
      for (const p of iterable) {
        results.push(undefined)
        const idx = count++
        let alreadyCalled = false

        const done = (status) => (result) => {
          if (alreadyCalled) return
          alreadyCalled = true
          count--
          results[idx] = { status: status }
          status === 'resolved' ? (results[idx].value = result) : (results[idx].reason = result)
          if (count === 0) resolve(results)
        }

        Promise.resolve(p).then(
          (result) => {
            done('resolved')(result)
          },
          (err) => {
            done('rejected')(err)
          }
        )
      }

      if (count === 0) {
        resolve(results)
      }
    })
  }

  static simpleAllSettle(iterable) {
    if (!isIterable(iterable)) {
      throw new TypeError(iterable + 'is not iterable')
    }

    const successAbsolute = (promiseList) => {
      return promiseList.map((promise) =>
        promise.then(
          (value) => ({ status: 'resolved', value }),
          (reason) => ({ status: 'rejected', reason })
        )
      )
    }
    return Promise.all(successAbsolute(iterable))
  }
}

// promise 状态迁移的公共函数
const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return

  promise.state = state
  promise.result = result

  // 这里处理then注册的callback，因此需要通过其他platform Api实现异步调用
  runAsync(() => {
    while (promise.callbacks.length) {
      handleCallback(promise.callbacks.shift(), state, result)
    }
  })
}

const handleCallback = (callback, state, result) => {
  const { resolve, reject, onFulfilled, onRejected } = callback

  // 2.2
  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
      // 如果有注册catch或者onRejected
    }
  } catch (error) {
    reject(error)
  }
}

// 2.3 Promise Resolution Procedure
const resolvePromise = (promise, x, resolve, reject) => {
  // 2.3.1
  if (x === promise) {
    return reject(new TypeError(''))
  }

  // 2.3.2
  if (isPromise(x)) {
    return x.then(resolve, reject)
  }

  // 2.3.3 if x is an object or function
  // Note that the specification does not require x to be thenable here.
  if (isFunction(x) || isObject(x)) {
    // 2.3.3.2 retrieving the x.then
    try {
      const then = x.then
      // 3.5
      if (isFunction(then)) {
        return new Promise(then.bind(x)).then(resolve, reject)
      }
    } catch (error) {
      return reject(error)
    }
  }

  resolve(x)
}

const runAsync = (cb) => {
  setTimeout(() => {
    cb()
  }, 0)
}

const runAsyncWithMutationObserver = (cb) => {
  const observer = new MutationObserver(cb)
  const textNode = document.createTextNode('1')
  observer.observe(textNode, { characterData: true })
  textNode.data = '2'
}

const runAsyncWithMessageChannel = (cb) => {
  const channel = new MessageChannel()
  channel.port1.onmessage = cb
  channel.port2.postMessage(1)
}

module.exports = Promise
