const bind = function(thisArg, ...boundArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function')
  }
  const fn = this

  const bound = function(...args) {
    const finalArgs = boundArgs.concat(args)

    // when new bound
    if (new.target) {
      if (fn.prototype) {
        bound.prototype = Object.create(fn.prototype)
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

const bindES5 = function(thisArg) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function')
  }

  var fn = this
  var boundArgs = [].slice.call(arguments, 1)

  var bound = function() {
    var args = [].slice.call(arguments)
    var finalArgs = boundArgs.concat(args)

    if (this instanceof bound) {
      // 当传入的不是箭头函数
      if (fn.prototype) {
        function F () {}
        F.prototype = fn.prototype
        // bound的prototype 替换为 原函数的prototype
        bound.prototype = new F()
      }

      // 获取原函数执行的结果，这里的this等同于 new Fn() 时创建的实例
      const result = fn.apply(this, finalArgs)

      const isFunction = typeof result === 'function'
      const isObject = !!(result && typeof result === 'object')

      // 如果原函数返回了函数或对象，则返回给值
      if (isFunction || isObject) {
        return result
      }
      
      // 否则返回this 
      // fn.apply时，已经将this传递给 fn，模拟new的操作
      return this
    }
    return fn.apply(thisArg, finalArgs)
  }

  return bound
}

module.exports = {
  bind,
  bindES5
}
