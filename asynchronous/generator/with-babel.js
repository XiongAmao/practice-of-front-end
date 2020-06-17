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

// Complied with babel@7
;('use strict')

require('regenerator-runtime/runtime')

var _marked = /*#__PURE__*/ regeneratorRuntime.mark(say)

function say() {
  var b
  return regeneratorRuntime.wrap(function say$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2
          return 1

        case 2:
          b = _context.sent
          console.log(1)
          _context.next = 6
          return 2

        case 6:
          b = _context.sent
          console.log(2)
          _context.next = 10
          return 3

        case 10:
          console.log(3)
          return _context.abrupt('return', 'end')

        case 12:
        case 'end':
          return _context.stop()
      }
    }
  }, _marked)
}
