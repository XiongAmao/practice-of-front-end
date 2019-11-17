const isObject = obj => !!obj && typeof obj === 'object'
const isFunction = func => typeof func === 'function'

function overloadObject (obj, name, func) {
  if (!isObject(obj)) return

  const old = obj[name]

  object[name] = function (...args) {
    if (func.length === args.length) {
      return func.apply(this, args)
    } else if (isFunction(old)){
      return old.apply(this, args)
    }
  }
}
