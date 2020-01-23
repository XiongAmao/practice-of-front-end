// source
function* say() {
  yield 1
  console.log(1)

  yield 2
  console.log(1)

  yield 3
  console.log(1)

  return 'end'
}

var gen = say()

var word1 = gen.next() // { value: 1, done: false }
var word2 = gen.next() // { value: 2, done: false }
var word3 = gen.next() // { value: 3, done: false }
var end = gen.next() // { value: 'end', done: true }

// Complied with babel@7
'use strict'

require('regenerator-runtime/runtime')

// set test[toStringTagSymbol] = GeneratorFunction
var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(say)

function say() {
  return regeneratorRuntime.wrap(function say$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          console.log(1);
          _context.next = 5;
          return 2;

        case 5:
          console.log(1);
          _context.next = 8;
          return 3;

        case 8:
          console.log(1);
          return _context.abrupt("return", "end");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked)
}

var gen = say()
var word1 = gen.next() // { value: 1, done: false }
var word2 = gen.next() // { value: 2, done: false }
var word3 = gen.next() // { value: 3, done: false }
var end = gen.next() // { value: 'end', done: true } there is return value