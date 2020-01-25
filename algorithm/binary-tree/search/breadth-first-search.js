function dfsPreOrderTraversal(root) {
  const result = []
  const stack = []
  let cur = root

  while (cur || stack.length > 0) {
    if (cur) {
      result.push(cur.val)
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop().right
    }
  }
  return result
}

function bfs(root) {
  const result = []
  const queue = [root]
  while (queue.length > 0) {
    const node = queue.shift()
    result.push(node.val)
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }
  return result
}

module.exports = {
  dfsPreOrderTraversal,
  bfs
}
