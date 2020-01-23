function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let noChange = true
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        noChange = false
      }
    }
    if (noChange) {
      break
    }
  }
  return arr
}

module.exports = bubbleSort
