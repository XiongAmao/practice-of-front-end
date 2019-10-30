const bind = function(thisArg, ...boundArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function')
  }
  const fn = this

  const bound = function(...args) {
    const finalArgs = boundArgs.concat(args)

    // when new bound
    if (bound.prototype.isPrototypeOf(this)) {
      if (fn.prototype) {
        function F() {}
        F.prototype = fn.prototype
        bound.prototype = new F()
      }

      const result = fn.apply(this, finalArgs)

      const isFunction = typeof result === 'function'
      const isObject = !!(result && typeof result === 'object')

      if (isFunction || isObject) {
        return result
      }

      return this
    } else {
      return fn.apply(thisArg, finalArgs)
    }
  }

  // reset bound arguments length & name
  Object.defineProperties(bound, {
    length: { value: fn.length },
    name: { value: `bound ${fn.name}` }
  })

  return bound
}

module.exports = {
  bind
}
