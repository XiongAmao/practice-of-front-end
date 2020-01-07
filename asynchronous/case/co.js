const { read } = require('./promisify')

function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      const { value, done } = it.next(data)
      if (!done) {
        value.then((data) => {
          next(data)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next()
  })
}

function *gen() {
  const r1 = yield read('files/1.txt', 'utf8')
  const r2 = yield read(r1, 'utf8')
  const r3 = yield read(r2, 'utf8')
  return r3
}

// use co
co(gen()).then((result) => {
  console.log(result)
})