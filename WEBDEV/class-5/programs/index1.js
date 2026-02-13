
const fs = require('fs')
function fsReadFilePromisified(fileName,encoding){
  
    return new Promise((resolve,reject)=>{
        
          const content = fs.readFile(fileName,encoding,(err,data)=>{
                if(!err){
                        resolve(data)
                }else{
                        reject("Error in file reading"+err.message)
                }
          });
         
    })
}


fsReadFilePromisified('a.txt','utf-8').then(data=>{
    console.log('Data : '+data)
}).catch(err=>{
    console.log("Error : "+err)
})