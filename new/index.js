function myNew(constructor, ...args) {
  // 1. create a black, plain JavaScript Object
  var obj = {}

  // 2. sets the constructor of this object to another object
  Object.setPrototypeOf(obj, constructor.prototype)

  // 3. passes the newly created object from Step 1 as the this context
  let result = constructor.apply(obj, args)

  // 4. return this if the function doesn't return its own objects.
  return Object(result) === result ? result : obj
}
