const { bind: bindFn, bindES5 } = require('./index')

Function.prototype.bindFn = bindFn
Function.prototype.bindES5 = bindES5

// test case came from  https://github.com/es-shims/es5-shim/blob/master/tests/spec/s-function.js#L15-L173
describe('ES6 bind function', () => {
  let actual = []
  let testSubject = {
    push(o) {
      this.a.push(0)
    }
  }

  let func = function func(...args) {
    args.forEach((el) => {
      this.push(el)
    })
    return this
  }

  beforeEach(() => {
    actual = []
    testSubject.a = []
  })

  test('binds properly without a context', () => {
    let context

    testSubject.func = function() {
      context = this
    }.bind()

    testSubject.func()

    expect(context).toBe(
      function() {
        return this
      }.call()
    )
  })

  test('binds properly without a context, and still supplies bound arguments', () => {
    let a, context

    testSubject.func = function(...args) {
      a = args
      context = this
    }.bind(undefined, 1, 2, 3)

    testSubject.func(1, 2, 3)

    expect(a).toEqual([1, 2, 3, 1, 2, 3])
    expect(context).toBe(
      function() {
        return this
      }.call()
    )
  })

  test('binds a context properly', () => {
    testSubject.func = func.bind(actual)
    testSubject.func(1, 2, 3)
    expect(actual).toEqual([1, 2, 3])
    expect(testSubject.a).toEqual([])
  })

  test('binds a context and supplies bound arguments', () => {
    testSubject.func = func.bind(actual, 1, 2, 3)
    testSubject.func(4, 5, 6)
    expect(actual).toEqual([1, 2, 3, 4, 5, 6])
    expect(testSubject.a).toEqual([])
  })

  test('returns properly without binding a context', () => {
    testSubject.func = function() {
      return this
    }.bind()
    var context = testSubject.func()
    expect(context).toBe(
      function() {
        return this
      }.call()
    )
  })

  test('returns properly without binding a context, and still supplies bound arguments', function() {
    var context
    testSubject.func = function() {
      context = this
      return Array.prototype.slice.call(arguments)
    }.bind(undefined, 1, 2, 3)
    actual = testSubject.func(1, 2, 3)
    expect(context).toBe(
      function() {
        return this
      }.call()
    )
    expect(actual).toEqual([1, 2, 3, 1, 2, 3])
  })

  test('returns properly while binding a context properly', function() {
    var ret
    testSubject.func = func.bind(actual)
    ret = testSubject.func(1, 2, 3)
    expect(ret).toBe(actual)
    expect(ret).not.toBe(testSubject)
  })

  test('returns properly while binding a context and supplies bound arguments', function() {
    var ret
    testSubject.func = func.bind(actual, 1, 2, 3)
    ret = testSubject.func(4, 5, 6)
    expect(ret).toBe(actual)
    expect(ret).not.toBe(testSubject)
  })

  test("has the new instance's context as a constructor", function() {
    var actualContext
    var expectedContext = { foo: 'bar' }
    testSubject.Func = function() {
      actualContext = this
    }.bind(expectedContext)
    var result = new testSubject.Func()
    expect(result).toBeTruthy()
    expect(actualContext).not.toBe(expectedContext)
  })

  test('passes the correct arguments as a constructor', function() {
    var expected = { name: 'Correct' }
    testSubject.Func = function(arg) {
      expect(Object.prototype.hasOwnProperty.call(this, 'name')).toBe(false)
      return arg
    }.bind({ name: 'Incorrect' })
    var ret = new testSubject.Func(expected)
    expect(ret).toBe(expected)
  })
  test('returns the return value of the bound function when called as a constructor', function() {
    var oracle = [1, 2, 3]
    var Subject = function() {
      expect(this).not.toBe(oracle)
      return oracle
    }.bind(null)
    var result = new Subject()
    expect(result).toBe(oracle)
  })

  test('returns the correct value if constructor returns primitive', function() {
    var Subject = function(oracle) {
      expect(this).not.toBe(oracle)
      return oracle
    }.bind(null)

    var primitives = ['asdf', null, true, 1]
    for (var i = 0; i < primitives.length; ++i) {
      expect(new Subject(primitives[i])).not.toBe(primitives[i])
    }

    var objects = [[1, 2, 3], {}, function() {}]
    for (var j = 0; j < objects.length; ++j) {
      expect(new Subject(objects[j])).toBe(objects[j])
    }
  })

  test('returns the value that instance of original "class" when called as a constructor', function() {
    var ClassA = function(x) {
      this.name = x || 'A'
    }
    var ClassB = ClassA.bind(null, 'B')

    var result = new ClassB()
    expect(result instanceof ClassA).toBe(true)
    expect(result instanceof ClassB).toBe(true)
  })

  test('sets a correct length without thisArg', function() {
    var Subject = function(a, b, c) {
      return a + b + c
    }.bind()
    expect(Subject.length).toBe(3)
  })

  test('sets a correct length with thisArg', function() {
    var Subject = function(a, b, c) {
      return a + b + c + this.d
    }.bind({ d: 1 })
    expect(Subject.length).toBe(3)
  })

  test('sets a correct length with thisArg and first argument', function() {
    var Subject = function(a, b, c) {
      return a + b + c + this.d
    }.bind({ d: 1 }, 1)
    expect(Subject.length).toBe(2)
  })

  test('sets a correct length without thisArg and first argument', function() {
    var Subject = function(a, b, c) {
      return a + b + c
    }.bind(undefined, 1)
    expect(Subject.length).toBe(2)
  })

  test('sets a correct length without thisArg and too many argument', function() {
    var Subject = function(a, b, c) {
      return a + b + c
    }.bind(undefined, 1, 2, 3, 4)
    expect(Subject.length).toBe(0)
  })
})

// describe('ES5 bind function', () => {})
