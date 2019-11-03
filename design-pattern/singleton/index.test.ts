import { Singleton } from './index'

test('Instances should be the same Object.', () => {
  const sg = new Singleton()
  const sg2 = new Singleton()
  const ins = Singleton.instance

  expect(sg).toBe(sg2)
  expect(sg2).toBe(ins)
  expect(sg).toBe(ins)
})
