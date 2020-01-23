const bubbleSort = require('./bubble-sort')

const arr = [4, 8, 1, 7, 4, 0, 5, 8, 7, 5, 9, 6, 4, 0]

test('BubbleSort', () => {
  expect(bubbleSort(arr)).toEqual([0, 0, 1, 4, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9])
})
