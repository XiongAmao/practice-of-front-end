
// promise
function run(fn) {
  return new Promise((resolve, reject) => {
    const g = fn()

    function _next(val) {
      let result
      try {
        result = g.next(val)
      } catch (e) {
        return reject(e)
      }

      if (result.done) {
        return resolve(result.value)
      }

      Promise.resolve(result.value).then(
        (val) => {
          _next(val)
        },
        (err) => {
          g.throw(err)
        }
      )
    }

    _next()
  })
}

// case
function* getData() {
  const data1 = yield fetch('/1')
  const data2 = yield fetch('/2')
  const data3 = yield fetch('/3')

  return [data1, data2, data3]
}

run(getData).then(datas => {
  console.log(datas)
})


// node.js
const thunkify = (fn) => {
  return function (...args) {
    return (callback) => {
      let called = false
      args.push(() => {
        if (called) return
        called = true
        callback.apply(null, args)
      })

      try {
        fn.apply(this, args)
      } catch (e) {
        callback(e)
      }
    }
  }
}

function runThunk(fn) {
  const g = fn()

  // callback (last param in nodejs)
  function _next(err, data) {
    const result = g.next(data)
    if (result.done) return
    result.value(_next)
    // value === readFileThunk('xxx')
    // pass the callback to the current yield (readFileThunk).
    // invoke the next 'readFile' function after current tasks finished.
  }

  _next()
  // first run
}

const fs = require('fs')
const readFileThunk = thunkify(fs.readFile)

function* readFiles() {
  const file1 = yield readFileThunk('./file1.txt')
  const file2 = yield readFileThunk('./file2.txt')
  const file3 = yield readFileThunk('./file3.txt')
}

runThunk(readFiles)
