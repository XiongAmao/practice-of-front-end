// Double loop traversal

function uniqueDoubleLoop(arr) {
  if (!Array.isArray(arr)) {
    throw TypeError('params should be array')
  }

  const res = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    let noRepeat = true
    for (let j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) {
        noRepeat = false
        break
      }
    }
    if (noRepeat) {
      res.push(arr[i])
    }
  }

  return res
}

function uniqueSet(arr) {
  return [...new Set(arr)]
}

function uniqueIndexof(arr) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

module.exports = {
  uniqueDoubleLoop,
  uniqueSet,
  uniqueIndexof
}
