class Node {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

function createLinkList(list = [1, 2, 3, 4, 5, 6, 7, 8]) {
  let head
  let curNode
  list.forEach((val, idx) => {
    const newNode = new Node(val)
    newNode.prev = curNode || null
    if (idx) {
      curNode.next = newNode
      curNode = newNode
    } else {
      head = newNode
      curNode = newNode
    }
  })
  return head
}

const revert = (head, k = 2) => {
  if (!head.next) return head

  const matrix = [[]]

  let cur = head
  let idx = k

  while (cur) {
    if (idx) {
      matrix[matrix.length - 1].push(cur)
      idx--
      cur = cur.next
    } else {
      matrix.push([])
      idx = k
    }
  }

  const arr = matrix.map((nodeList, idx) => {
    // 剩余节点保持原顺序
    if (nodeList.length < k) {
      return nodeList
    }
    // 反转每一组
    nodeList.forEach((node, idx) => {
      node.prev = nodeList[idx + 1] || null
      node.next = nodeList[idx - 1] || null
    })

    return nodeList.reverse()
  })

  arr.forEach((nodeList, idx) => {
    nodeList[nodeList.length - 1].next = arr[idx + 1] ? arr[idx + 1][0] : null
    nodeList[0].prev = arr[idx - 1] ? arr[idx - 1][arr[idx - 1].length - 1] : null
  })

  return arr[0][0]
}

const reverse = (a, b) => {
  let prev = null,
    cur = a,
    next = a
  while (cur !== b) {
    next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }

  return prev
}
const revert2 = (head, k) => {
  if (head === null) return null

  let a = head,
    b = head
  for (let i = 0; i < k; i++) {
    if (b === null) return head
    b = b.next
  }

  const newHead = reverse(a, b)
  a.next = revert2(b, k)
  return newHead
}

function test(revert, list, k) {
  const head = createLinkList(list)
  let curNode = revert(head, k)
  while (curNode) {
    console.log(curNode.val)
    curNode = curNode.next
  }
}

test(revert, [1, 2, 3, 4, 5, 6], 4)
console.log('------')
test(revert, [1, 2, 3, 4, 5, 6], 2)
console.log('------')
test(revert, [1, 2, 3], 3)
