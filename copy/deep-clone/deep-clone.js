const isType = (type) => (val) => Object.prototype.toString.call(val).slice(8, -1) === type

function deepCloneFunction(source, visited = new Map()) {
  if (typeof source !== 'object') {
    return source
  }
  if (source === null) {
    return null
  }

  if (visited.has(source)) {
    return visited.get(source)
  }

  if (typeof source === 'object') {
    let copiedValue
    if (isType('Array')(source)) {
      copiedValue = []
    } else if (isType('Function')(source)) {
      copiedValue = function () {
        return source.apply(this, arguments)
      }
    } else if (isType('Date')(source)) {
      copiedValue = new Date(source)
    } else if (isType('RegExp')(source)) {
      copiedValue = new RegExp(source.source, source.flags)
    } else {
      // others
      copiedValue = {}
    }

    visited.set(source, copiedValue)

    Object.entries(source).forEach(([key, value]) => {
      copiedValue[key] = deepCloneFunction(value, visited)
    })
  }

  return source
}

class deepCloneClass {
  constructor() {
    this.visited = new Map()
  }
  clone(source) {
    if (source === null) {
      return null
    }
    if (typeof source !== 'object') {
      return source
    }
    if (this.visited.has(source)) {
      return this.visited.get(source)
    }
    if (typeof source === 'object') {
      let copiedValue
      if (isType('Array')(source)) {
        copiedValue = []
      } else if (isType('Function')(source)) {
        copiedValue = function () {
          return source.apply(this, arguments)
        }
      } else if (isType('Date')(source)) {
        copiedValue = new Date(source)
      } else if (isType('RegExp')(source)) {
        copiedValue = new RegExp(source.source, source.flags)
      } else {
        // ... 穷举可能的情况，然后兜底
        copiedValue = {}
      }
      this.visited.set(source, copiedValue)

      Object.entries(source).forEach(([key, val]) => {
        copiedValue[key] = this.clone(val)
      })
      return copiedValue
    }

    return source
  }
}

module.exports = {
  deepCloneClass,
  deepCloneFunction
}
