const fib = (n) => {
  if (n <= 2) {
    return 1
  }
  return fib(n - 1) + fib(n - 2)
}

const withMemo = (n) => {
  const memo = [1, 1]
  const fib = (n) => {
    if (!memo[n - 1]) {
      memo[n - 1] = fib(n - 1) + fib(n - 2)
    }
    return memo[n - 1]
  }
  fib(n)

  return memo
}

const fibWithTailCall = (n, prev = 1, next = 1) => {
  if (n <= 1) {
    return next
  }
  return fibWithTailCall(n - 1, next, prev + next)
}

const fibForLoop = (n) => {
  if (n <= 2) return 1
  let sum = 0
  let prev = 1
  let next = 1

  for (let i = 3; i <= n; i++) {
    sum = prev + next
    prev = next
    next = sum
  }

  return sum
}
