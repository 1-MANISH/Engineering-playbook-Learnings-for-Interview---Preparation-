// read a file synchoronousaly - takes time
// which is CPU heavy operations
// to read a file from a file system
// which ask OS to read a file
// OS checks and read the file
// then give to our programs

import fs from 'fs'

console.log("START")
let data = fs.readFileSync('./index.txt','utf-8')
console.log(data)
let sum = 0 ;
for(let i  = 0 ; i <100 ; i++){
        sum+=i;
}
console.log(sum)