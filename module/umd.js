;(function(global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // commonJS
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    // amd
    define(factory)
  } else if (typeof define === 'function' && define.cmd) {
    // cmd sea.js
    define(function(require, exports, module) {
      module.exports = factory()
    })
  } else {
    // global
    global = global || self // window.self
    global.myModule = factory()
  }
})(this, function factory() {
  // this === window / global ...etc
  return {
    name: 'my module'
  }
})
