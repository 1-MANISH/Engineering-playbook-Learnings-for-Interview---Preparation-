/*
  Write a function `findDuplicates` which takes an array as input and returns an array containing all the duplicate elements.

  What are duplicates?
  - Elements that appear more than once in the array are considered duplicates.

  Example:
  - Input: [10, 20, 30, 10, 40]
  - Output: [10]

  - Input: [1, 2, 3, 4, 5]
  - Output: []

  - Input: []
  - Output: []

  Once you've implemented the logic, test your code by running
  - `npm run test-duplicates`
*/


function findDuplicates(arr) {
     const elementsCount = {}
     const duplicates = []
     for(let element of arr){
         if(elementsCount[element])elementsCount[element] += 1
         else elementsCount[element] = 1
     }
     for(let key in elementsCount){
        if(elementsCount[key]>1)duplicates.push(Number(key))
     }
        return duplicates
}
module.exports = findDuplicates;

