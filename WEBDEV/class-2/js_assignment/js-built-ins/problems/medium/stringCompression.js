/*
  Write a function `compression` which takes a string as input and returns a compressed version of the string. The compression is done by replacing consecutive repeating characters with the character followed by the count of repetitions. If a character does not repeat, it is not followed by a count.

  Example:
  - Input: "aaabbbbcccvvmm"
  - Output: "a3b4c3v2m2"

  - Input: "abc"
  - Output: "abc"

  - Input: "aabbcc"
  - Output: "a2b2c2"

  - Input: ""
  - Output: ""

  Note:
  - The function should work for any alphanumeric string.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressString`
*/
function compression(str) {
    if(str.length==0)return "";
   let i = 1 , j = 0 , n =str.length ,currentCount=1;
   let outputStr = str[j];
   while(i<n){
       if(str[i]==outputStr[j]){currentCount++,i++}
       else{
           if(currentCount>=2)
                outputStr+=currentCount.toString()+str[i];
            else
                outputStr+=str[i];
           j = outputStr.length-1;
           i++;
           currentCount=1;
       }
   }
   if(currentCount>=2)
   outputStr+=currentCount.toString()
   return outputStr;
}
module.exports = compression;