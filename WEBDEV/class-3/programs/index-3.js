import fs from 'fs'

console.log("START")
const data = fs.readFile('index.txt','utf-8',(res,err)=>{
        if(err){
                console.log(err)
                return
        }else{
                  console.log(data)
        }
})

let sum = 0 ;
for(let i = 0 ; i < 1000 ; i++){
      sum+=i
}
console.log(sum)
console.log("END")

/*

if cpu is doing its task( by looping n numbers)
then after file read by (OS ) done then
also we first print sum till n and then  only
content of file prints


becuase js thread is busy doing CPU
tasks so once it will free from printing
loop things then only

asyn task push by event loops to the
call stack then it executes / or print
whatever readed by readFile
*/