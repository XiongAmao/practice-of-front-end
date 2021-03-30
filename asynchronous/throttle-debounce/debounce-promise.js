// https://juejin.im/post/5d5dec58f265da03e61b15da

function debouncePromise(promiseFactory, delay = 100, keyIndex = 0) {
  const cache = new Map()
  return (...args) =>
    new Promise((resolve, reject) => {
      // 通过请求参数作为缓存的key，比如 getOrder('test.com/order') 默认第一参数, 这里具体根据业务来拓展
      const key = args[keyIndex]
      let task = cache.get(key)
      if (!task) {
        task = { status: 0, count: 0, result: null }
        cache.set(key, task)
      }
      // status 0 pending 1 waiting 2 done 3 fail
      if (task.status === 0) {
        task.status = 1
        promiseFactory(...args).then(
          (result) => {
            resolve(result)
            task.result = result
            task.status = 2
          },
          (err) => {
            reject(err)
            task.result = err
            task.status = 3
          }
        )
      } else if (task.status == 1) {
        task.count += 1
        const waitingHandle = setInterval(() => {
          if (task.status > 1) {
            clearInterval(waitingHandle)
            task.status === 2 ? resolve(task.result) : reject(task.result)
            task.count -= 1
            if (!task.count) {
              cache.delete(key)
            }
          }
        }, delay)
      }
    })
}
