const { bind : bindFn } = require('./index')

Function.prototype.bindFn = bindFn

describe('implement bind function', () => {
  test('bind is a function', () => {
    expect(bindFn).toBeInstanceOf(Function)
  })

  test('"this" keyword is set to the value provided.', () => {
    const test = function() {
      return this
    }

    const boundTest = test.bind({
      name: 'cat'
    })

    expect(boundTest().name).toEqual('cat')
  })

  test('accept any arguments', () => {

  })

  test('bound function name is ', () => {

  })
})