// TODO:
const { isGeneratorFunction, isGenerator } = require('./utils')

const co = (gen) => {
  const g = isGeneratorFunction(gen) ? gen() : gen

  if (!isGenerator(g)) { 
    return 
  }
}
