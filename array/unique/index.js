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

const createCase = () => {
  const objA = { a: 4 }
  const objB = { a: 4 }
  const input = [1, 2, 2, 1, '3', objA, objB, 3, '3', undefined, [5]]
  const answer = [1, 2, 3, '3', objA, objB, undefined, [5]]

  return { input, answer }
}

module.exports = {
  uniqueDoubleLoop
}

const { input } = createCase()
