const toStr = Object.prototype.toString

let GeneratorFunction = null

try {
  GeneratorFunction = new Function('return function* () {}')().constructor
} catch (e) {}

const isGeneratorFunction = (val) => {
  const toStringCheck = toStr.call(val) === '[object GeneratorFunction]'
  const legacyConstructorCheck = val !== null && val instanceof GeneratorFunction
  return toStringCheck || legacyConstructorCheck
}

const isGenerator = (val) => {
  const toStringCheck = toStr.call(val) === '[object Generator]'
  return toStringCheck
}

module.exports = {
  isGeneratorFunction,
  isGenerator
}
