/*
  Write a function `compressWords` which takes an array of strings as input and returns a new array with consecutive duplicate elements compressed. If an element appears consecutively, it is replaced by the element followed by the count of its occurrences.

  Example:
  - Input: ["apple", "apple", "banana", "banana", "banana", "cherry", "apple", "apple"]
  - Output: ["apple2", "banana3", "cherry", "apple2"]

  - Input: ["cat", "dog", "dog", "dog", "cat"]
  - Output: ["cat", "dog3", "cat"]

  - Input: ["one", "two", "three"]
  - Output: ["one", "two", "three"]

  - Input: []
  - Output: []

  Note:
  - The function should handle empty arrays and arrays with no consecutive duplicates.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressWord`
*/


function compressWords(strArr) {
    if(strArr.length==0)return [];
    let i = 1 , j = 0 , n =strArr.length ,currentCount=1;
   let outputArray = [strArr[j]];
   while(i<n){
       if(strArr[i]==outputArray[j]){currentCount++,i++}
       else{
            if(currentCount>=2)outputArray[j]=outputArray[j]+currentCount.toString()
            else outputArray[j]=outputArray[j];
            outputArray.push(strArr[i]);
            j++;
            i++;
            currentCount=1;
       }
   }
   if(currentCount>=2)
        outputArray[j]=outputArray[j]+currentCount.toString()
   return outputArray;
}

module.exports = compressWords;
