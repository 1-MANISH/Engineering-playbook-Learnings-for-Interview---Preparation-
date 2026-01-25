/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function  isChar(char){
    return char.toLowerCase()!=char.toUpperCase();
}

function isPalindrome(str) {
    let normalizedStr  = "";
    for(let char of str){
        if(char!=' ' && isChar(char))normalizedStr+=char;
    }
    normalizedStr = normalizedStr.toLowerCase()
    const reversedStr = normalizedStr.split('').reverse().join('');
    console.log(reversedStr)
    return normalizedStr === reversedStr;
}


module.exports = isPalindrome;