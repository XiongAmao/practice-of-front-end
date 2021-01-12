import { assert } from 'console'
import { deepClone } from './deep-clone'

describe('deepClone()', () => {
  test('deepClone targets', () => {
    test('can copy boolean', () => {
      const data = false
      deepClone()
    })
    test('can copy Boolean', () => {})
    test('can copy number', () => {})
    test('can copy Number', () => {})
    test('can copy string', () => {})
    test('can copy String', () => {})
    test('can copy symbol', () => {})
    test('can copy RegExp', () => {})
  })

  describe('recursively deepClone', () => {
    describe('Object', () => {

      test('Symbol in Object', () => {

      })

      test('', () => {

      })
    })

    test('Array', () => {

    })
    test('can copy Map', () => {

    })

    test('can copy Set', () => {

    })
  })
})
