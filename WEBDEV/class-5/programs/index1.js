
const fs = require('fs')

// sync

// const data = fs.readFileSync("a.txt","utf-8")
// console.log("Data : "+data)



// async 

// fs.readFile("aa.txt","utf-8",function(err,data){
//         if(err){
//                 console.log(err)
//         }else{
//                 console.log(data)
//         }       
// })


console.log("Before reading file")
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

console.log("After reading file")