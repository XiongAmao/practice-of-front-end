const { dfsPreOrderTraversal, bfs, dfsInOrderTraversal } = require('./search')

class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

const createTree = () => {
  node1 = new TreeNode(1)
  node2 = new TreeNode(2)
  node3 = new TreeNode(3)
  node4 = new TreeNode(4)
  node5 = new TreeNode(5)
  node6 = new TreeNode(6)

  node1.left = node2
  node1.right = node3

  node2.left = node4
  node2.right = node5

  node3.right = node6

  return node1
}

describe('binary tree search', () => {
  test('breadth first search', () => {
    const result = bfs(createTree())
    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('deep first search : pre-order traversal', () => {
    const result = dfsPreOrderTraversal(createTree())
    expect(result).toEqual([1, 2, 4, 5, 3, 6])
  })

  test('deep rist search : in-order traversal', () => {
    const result = dfsInOrderTraversal(createTree())
    expect(result).toEqual([4, 2, 5, 1, 3, 6])
  })
})
