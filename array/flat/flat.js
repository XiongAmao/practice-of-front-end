function flat1(arr) {
  let resultArr = []
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      resultArr = resultArr.concat(flat1(item))
    } else {
      resultArr.push(item)
    }
  })
  return resultArr
}

function flatReduce(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatReduce(cur) : cur)
  }, [])
}

// control level
function flat2(arr, level = 1) {
  if (level > 0) {
    let temp = []
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        temp = temp.concat(flat2(item, level - 1))
      } else {
        temp.push(item)
      }
    })
    return temp
  } else {
    return arr
  }
}

function flatReduce2(arr, level = 1) {
  return level > 0
    ? arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? flatReduce2(cur, level - 1) : cur)
      }, [])
    : arr
}
