const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const isObject = (obj) => !!(obj && typeof obj === 'object')
const isFunction = (fn) => typeof fn === 'function'
const isPromise = (p) => p instanceof Promise
const isThenable = (obj) => (isFunction(obj) || isObject(obj)) && 'then' in obj
const isIterable = (obj) => !!(isObject(obj) && typeof obj[Symbol.iterator] === 'function')

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
        setTimeout(() => handleCallback(callback, this.state, this.result), 0)
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

  static resolve(value) {
    return new Promise((resolve) => resolve(value))
  }

  static all(promises) {
    if (!isIterable(promises)) {
      throw new TypeError('')
    }

    const results = []
    let count = 0
    let done = false

    return new Promise((resolve, reject) => {
      for (const p of promises) {
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
      if (count === 0) resolve(promises)
    })
  }

  static race(promises) {
    if (!isIterable(promises)) {
      throw new TypeError('')
    }
    let done = false

    return new Promise((resolve, reject) => {
      for (const p of promises) {
        count++
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
}

// promise 状态迁移的公共函数
const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return

  promise.state = state
  promise.result = result

  // 这里处理then注册的callback，因此需要通过其他platform Api实现异步调用
  setTimeout(() => {
    while (promise.callbacks.length) {
      handleCallback(promise.callbacks.shift(), state, result)
    }
  }, 0)
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

  // 2.3.3 提供互操作性
  if (isThenable(x)) {
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

module.exports = Promise
