function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}

// fs
const fs = require('fs')

const read = promisify(fs.readFile)

read('1.txt', 'utf8')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
