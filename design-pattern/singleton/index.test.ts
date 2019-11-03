import { Singleton } from './index'

test('Instances should be the same Object.', () => {
  const sg = new Singleton()
  const sg2 = new Singleton()
  const ins = Singleton.instance

  expect(sg).toEqual(sg2)
  expect(sg2).toEqual(ins)
  expect(sg).toEqual(ins)
})
