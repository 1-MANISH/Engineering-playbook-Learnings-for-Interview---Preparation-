// string
/*
str.length
str.toUpperCase()
str.toLowerCase()
str.indexOf(substring) -> return index or -1
str.lastIndexOf(substring) -> return index or -1
str.includes(substring) -> return true/false
str.startsWith(substring) -> return true/false
str.endsWith(substring) -> return true/false
str.slice(start, end+1)=> return substring
str.substr(start, length) => return substring
str.replace(oldSubstring, newSubstring)-> return new string
str.concat(str2)
str.trim()
str.split(separator) -> return array

*/

// let str =  'Hardik Patidar'

// const arr = str.split(' ')
// console.log(arr); // ['Hardik', 'Patidar']

// const newStr =arr.join(' ')
// console.log(newStr); // 'Hardik Patidar'


// number

// function explainParseInt(value){
//         console.log(`Original Value: ${value} and type is ${typeof value}`);
//         const parsedValue = parseInt(value)
//         console.log(`Parsed Value: ${parsedValue} and type is ${typeof parsedValue}`);
// }

// explainParseInt('100') // 100
// explainParseInt('100abc')//100
// explainParseInt('abc100')//NaN
// explainParseInt('12.34')// 12
// explainParseInt('   56   ')// 56
// explainParseInt('0x11')// 17

// console.log(parseFloat('12.34abc')) // 12.34
// console.log(parseFloat('12.34abc')) // NaN
// console.log(parseFloat('   56   ')) // 56
// console.log(parseFloat('0x11')) // 17

// console.log(Number('12.34abc')) // NaN
// console.log(Number('   56   ')) // 56
// console.log(Number('0x11')) // 17


// array

/*
arr.push(element) -> add at end
arr.pop() -> remove from end
arr.unshift(element) -> add at start
arr.shift() -> remove from start
arr.splice(index, count) -> remove from index - change original array
arr.splice(index, 0, element1, element2) -> add at index - change original array
arr.slice(start, end+1) -> return sub array
arr.indexOf(element) -> return index or -1
arr.lastIndexOf(element) -> return index or -1
arr.includes(element) -> return true/false
arr.concat(arr2) -> return new array
arr.join(separator) -> return string

const index = arr.findIndex(callback) -> return index or -1
const foundElement = arr.find(callback) -> return element or undefined


for(let element of arr) -> iterate over elements - use for simple arrays
for(let index in arr) -> iterate over indices - use for complex arrays (array of objects)
or for(let key in object) -> iterate over keys of object

arr.forEach(callback) -> void - used to iterate array
arr.map(callback) -> return new array - used to transform array
arr.filter(callback) -> return new array - used to filter array
arr.reduce(callback, initialValue) -> return single value - used to accumulate array values
callback -> (accumulator, currentValue, index, array)
if initialValue is not provided, first element is used as initialValue and iteration starts from second element

arr.sort() -> sort array

arr.sort((a,b)=> a-b ) -> ascending order
arr.sort((a,b)=> b-a ) -> descending order
a>b chaiye to +1 return kar do else -1
overall 1 means swap, -1 means no swap

*/
const arr = [10,20,30,40,50]
const objectArray  =[
        {name: 'Hardik', age: 23},
        {name: 'Ankush', age: 26},
        {name: 'Kisrtish', age: 22},
]

let object = {name: 'Hardik', age: 23, city: 'Indore'}
// console.log(arr.splice(1,0,1,2)) // 2; 
// console.log(arr); // [1,10,20,30,40,50]

// arr.forEach((element, index,arr)=>{
//         console.log(`Element at index ${index} is ${element}, array is ${arr}`);
// })

const newObjectArray = objectArray.filter((element)=>{
        return element.age <= 23
})
// console.log(newObjectArray);

const sum = arr.reduce((acc,current,index,arr)=>{
        // console.log(`Accumulator: ${acc}, Current Value: ${current}, Index: ${index}, Array: ${arr}`);
        return acc + current
},0)

const sum2 = arr.reduce((acc,current)=>acc+current)

console.log(sum,sum2);

objectArray.sort((a,b)=> a.age>b.age ?1:-1)
console.log(objectArray);