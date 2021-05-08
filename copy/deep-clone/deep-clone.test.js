const { deepCloneClass: dcClass, deepCloneFunction: dcFunc } = require('./deep-clone')

const createDCInstance = () => new dcClass()

describe('deepClone function test', () => {
  describe('deepClone targets', () => {
    test('can copy boolean', () => {
      expect(dcFunc(true)).toEqual(true)
      expect(dcFunc(false)).toEqual(false)
    })

    test('can copy number', () => {
      expect(dcFunc(123)).toEqual(123)
      expect(dcFunc(Number.MAX_SAFE_INTEGER)).toEqual(Number.MAX_SAFE_INTEGER)
      expect(dcFunc(NaN)).toBeNaN()
    })

    test('can copy string', () => {
      expect(dcFunc('Hello')).toEqual('Hello')
    })

    test('can copy symbol', () => {
      const data = Symbol('test')

      expect(dcFunc(data)).toEqual(data)
    })

    test('can copy RegExp', () => {
      const data = { a: /test/g }

      expect(dcFunc(data).a).toBeInstanceOf(RegExp)
      expect(dcFunc(data).a.source).toBe(data.a.source)
      expect(dcFunc(data).a.flags).toBe(data.a.flags)
    })

    test('can copy Date', () => {
      const date = new Date()

      expect(dcFunc(date)).toEqual(date)
    })
  })

  describe('recursively deepClone', () => {
    test('mixin', () => {
      const data = {
        name: function () {
          return 'name'
        },
        abc: class A {},
        date: new Date('1988-10-22'),
        reg: /test/g,
        array: [{ a: 'string', subReg: /\\\\.+/ }, 2, 3]
      }
      const result = dcFunc(data)

      expect(result).toEqual(data)
      expect(result.name()).toBe('name')
      expect(result.date).toEqual(new Date('1988-10-22'))
      expect(result.reg).toEqual(new RegExp('test', 'g'))
      expect(result.array[0].subReg).toEqual(/\\\\.+/)
    })
  })
})

describe('deepClone class implement', () => {
  describe('deepClone targets', () => {
    test('can copy boolean', () => {
      const dc = createDCInstance()

      expect(dc.clone(true)).toEqual(true)
      expect(dc.clone(false)).toEqual(false)
    })

    test('can copy number', () => {
      const dc = createDCInstance()

      expect(dc.clone(123)).toEqual(123)
      expect(dc.clone(Number.MAX_SAFE_INTEGER)).toEqual(Number.MAX_SAFE_INTEGER)
      expect(dc.clone(NaN)).toBeNaN()
    })

    test('can copy string', () => {
      const dc = createDCInstance()

      expect(dc.clone('Hello')).toEqual('Hello')
    })

    test('can copy symbol', () => {
      const dc = createDCInstance()
      const data = Symbol('test')

      expect(dc.clone(data)).toEqual(data)
    })

    test('can copy RegExp', () => {
      const dc = createDCInstance()
      const data = { a: /test/g }

      expect(dc.clone(data).a).toBeInstanceOf(RegExp)
      expect(dc.clone(data).a.source).toBe(data.a.source)
      expect(dc.clone(data).a.flags).toBe(data.a.flags)
    })

    test('can copy Date', () => {
      const dc = createDCInstance()
      const date = new Date()

      expect(dc.clone(date)).toEqual(date)
    })
  })

  describe('recursively deepClone', () => {
    test('mixin', () => {
      const dc = createDCInstance()
      const data = {
        name: function () {
          return 'name'
        },
        abc: class A {},
        date: new Date('1988-10-22'),
        reg: /test/i,
        array: [{ a: 'string', subReg: /\\\\.+/ }, 2, 3]
      }
      const result = dc.clone(data)

      expect(result).toEqual(data)
      expect(result.name()).toBe('name')
      expect(result.date).toEqual(new Date('1988-10-22'))
      expect(result.reg).toEqual(new RegExp('test', 'i'))
      expect(result.array[0].subReg).toEqual(/\\\\.+/)
    })
  })
})
