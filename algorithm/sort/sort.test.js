const bubbleSort = require('./bubble-sort')
const selectionSort = require('./selection-sort')

const creatInput = () => [0, 0, 1, 4, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9]
const anwser = [0, 0, 1, 4, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9]

describe('sort function collection', () => {
  test('Bubble Sort', () => {
    expect(bubbleSort(creatInput())).toEqual([0, 0, 1, 4, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9])
  })

  test('Selection Sort', () => {
    expect(selectionSort(creatInput())).toEqual([0, 0, 1, 4, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9])
  })
})
