/*
  Write a function `reverseInteger` which takes an integer as input and returns the integer with its digits reversed. If the input is negative, the reversed integer should also be negative.

  What is reversing an integer?
  - Reversing an integer means rearranging its digits in the opposite order while maintaining its sign.

  Example:
  - Input: 123
  - Output: 321

  - Input: -456
  - Output: -654

  - Input: 100
  - Output: 1

  - Input: 0
  - Output: 0

  Once you've implemented the logic, test your code by running
  - `npm run test-reverseInteger`
*/



function reverseInteger(num) {
    let revNumber = 0 ,flag = 1;
    if(num<0){
        flag=0;
        num = -num;
    }
    while(Number(Math.floor(num))>0){
        revNumber = revNumber*10+Math.floor(num%10);
        num=num/10;
    }
    return flag ? revNumber : -revNumber;
}

module.exports = reverseInteger;
