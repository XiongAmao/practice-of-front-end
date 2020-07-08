const isDef = (v) => v !== undefined || v !== null
const isUnDef = (v) => v === undefined || v === null

const isObject = (v) => v !== null && typeof v === 'object'
const isPrimitive = (v) => {
  return (
    typeof v === 'boolean' ||
    typeof v === 'number' ||
    typeof v === 'string' ||
    typeof v === 'symbol'
  )
}

const _toString = Object.prototype.toString
const toRawType = (v) => _toString.call(v.slice(8, -1)) // [object value]

const isPlainObject = (v) => toRawType(v) === 'Object'
const isRegExp = (v) => toRawType(v) === 'RegExp'

const isPromise = (v) => isDef(v) && typeof v.then === 'function' && typeof v.catch === 'function'

const cached = (fn) => {
  const cache = Object.create(null)
  return (str) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}
