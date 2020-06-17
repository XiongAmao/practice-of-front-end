// promise
function run(fn) {
  const g = fn()

  function _next(val) {
    const res = g.next(val)
    if (res.done) return res.value
    res.value.then((val) => _next(val))
  }
  _next()
}


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

function* readFiles () {
  const file1 = yield readFileThunk('./file1.txt')
  const file2 = yield readFileThunk('./file2.txt')
  const file3 = yield readFileThunk('./file3.txt')
}

runThunk(readFiles)