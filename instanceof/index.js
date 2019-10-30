const isObject = obj => !!(obj && typeof obj === 'object')

const newInstanceof = (left, right) => {
  if (!(isObject(right))) {
    throw new TypeError('Right-hand side of "instanceof" is not an object')
  }

  if (!(isObject(left))) {
    return false
  }

  let leftProto = Object.getPrototypeOf(left)

  while(true) {
    if (leftProto === null) {
      return false
    }
    if (leftProto === right.prototype) {
      return true
    }
    leftProto = Object.getPrototypeOf(left)
  }
}
