// source
function* say() {
  let b = yield 1
  console.log(1)

  b = yield 2
  console.log(2)

  yield 3
  console.log(3)

  return 'end'
}

// simulation of babel implementation

const createContext = () => {
  return {
    next: 0,
    prev: 0,
    sent: undefined,
    done: false,
    stop() {
      this.done = true
    }
  }
}

function say() {
  const context = createContext()

  var b

  function _say() {
    while (1) {
      switch ((context.prev = context.next)) {
        case 0:
          context.next = 2
          return 1

        case 2:
          b = context.sent
          console.log(1)

          context.next = 6
          return 2

        case 6:
          b = context.sent
          console.log(2)

          context.next = 10
          return 3

        case 10:
          console.log(3)
          context.next = 'end'
          return

        case 'return':
          return context.sent

        case 'end':
          return context.stop()
      }
    }
  }

  return {
    next(sent) {
      context.sent = sent

      const done = context.done
      const value = done ? undefined : _say()

      return {
        value,
        done
      }
    },
    return(sent) {
      context.done = true
      context.sent = sent
      context.next = 'return'

      const value = _say()
      return {
        done: true,
        value
      }
    }
  }
}
