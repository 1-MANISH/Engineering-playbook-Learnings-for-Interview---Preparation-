
const fs = require('fs')
function callbackSuccess(data){
        console.log(`Data: ${data}`)
}
function callbackFailure(error){
        console.log(`Error: ${error}`)
}

function promisifiedFileRead(filename,type){
        return new Promise((res,rej)=>{
                fs.readFile(filename,type,(err,data)=>{
                        if(err){
                                rej(err)
                        }else{
                                res(data)
                        }
                })
        })
}

promisifiedFileRead('a.txt','utf-8')
.then(callbackSuccess)
.catch(callbackFailure)