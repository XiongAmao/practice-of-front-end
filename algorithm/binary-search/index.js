const temp = [1, 2, 3, 4, 5, 6, 7, 8]
const target = 6

function binarySearchByIteration(arr, target) {
  if (end === undefined) {
    end = arr.length - 1
  }
  let start = 0
  let end = arr.length - 1

  // move start or end every loop
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start

    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      mid = end - 1
    } else if (arr[mid] > target) {
      mid = start + 1
    }
  }

  return -1
}

function binarySearchByRecursion(arr, target, start = 0, end) {
  if (end === undefined) {
    end = arr.length - 1
  }

  const mid = Math.floor((end - start) / 2)
  if (arr[mid] === target) {
    return mid
  }
  if (arr[mid] < target) {
    return binarySearchByRecursion(arr, target, mid + 1, end)
  } else if (arr[mid] > target) {
    return binarySearchByRecursion(arr, target, start, mid - 1)
  }
  return -1
}
