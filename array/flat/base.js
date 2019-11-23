const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]], 10, '11', { oh: 'haha' }]

// Iterating through an array
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

for (const item of arr) {
  console.log(item)
}

for (const item in arr) {
  console.log(item)
}

arr.forEach((item) => {
  console.log(item)
})

arr.map((item) => {
  console.log(item)
})

for (const [index, val] of arr.entries()) {
  console.log(val)
}

for (const index of arr.keys()) {
  console.log(arr[index])
}

for (const val of arr.values()) {
  console.log(val)
}

// is Array
arr instanceof Array
arr.constructor === Array
Object.prototype.toString.call(arr) === '[object Array]'
Array.isArray(arr)

// flat single level
let result = [].concat(...arr)

result = [].concat.apply([], arr)

result = arr.reduce((acc, val) => acc.concat(val))

/**
 * skip empty
 * 
 * Array prototype method: 
 * forEach() / reduce() / every() / some()
 * 
 * map() skip and keep the value  
 **/ 

 /**
  * empty to undefined
  * entries() / keys() / values() / find() / findIndex() 
  * 
  */