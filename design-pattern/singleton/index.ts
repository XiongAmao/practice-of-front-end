const singletonSymbol = Symbol('singleton')

class Singleton {
  constructor() {
    const sourceClass = this.constructor

    if (!sourceClass[singletonSymbol]) {
      sourceClass[singletonSymbol] = this
    }

    return sourceClass[singletonSymbol]
  }

  static [singletonSymbol]: Singleton | null

  static get instance() {
    if (this[singletonSymbol]) {
      return this[singletonSymbol]
    }

    return this[singletonSymbol] = new this()
  }
}

var es5Singleton = (function() {
  var instance
  function get() {
    return {
      dosomething() {}
    }
  }

  return {
    getInstance() {
      return instance || (instance = get())
    }
  }
})()