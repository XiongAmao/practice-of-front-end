const { uniqueDoubleLoop, uniqueSet, uniqueIndexOf, uniqueFilter } = require('./index')

const createCase = () => {
  const objA = { a: 4 }
  const objB = { a: 4 }
  const input = [1, 2, 2, 1, '3', objA, objB, 3, '3', undefined, [5]]
  const answer = [1, 2, '3', objA, objB, 3, undefined, [5]]

  return { input, answer }
}

describe('Remove duplicate values from JS array', () => {
  test('unique double loop function', () => {
    const { input, answer } = createCase()
    const result = uniqueDoubleLoop(input)
    expect(answer).toEqual(expect.arrayContaining(result))
    expect(result).toEqual(expect.arrayContaining(answer))
  })

  test('use Set', () => {
    const { input, answer } = createCase()
    const result = uniqueSet(input)
    expect(answer).toEqual(expect.arrayContaining(result))
    expect(result).toEqual(expect.arrayContaining(answer))
  })

  test('Array.prototype.indexOf', () => {
    const { input, answer } = createCase()
    const result = uniqueIndexOf(input)
    expect(answer).toEqual(expect.arrayContaining(result))
    expect(result).toEqual(expect.arrayContaining(answer))
  })

  test('Array.prototype.filter', () => {
    const { input, answer } = createCase()
    const result = uniqueFilter(input)
    expect(answer).toEqual(expect.arrayContaining(result))
    expect(result).toEqual(expect.arrayContaining(answer))
  })
})
