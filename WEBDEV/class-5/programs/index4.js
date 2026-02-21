

/*

Q: Write a function that

1. Reads the contents of a file
2. Trims the extra space from the left and right
3. Writes it back to the file


approaches - 
1.  Sync way - 3 lines (readFileSync, trim, writeFileSync) - thread will be blocked until the file is read and written

2 . Async way(callBack based async fxn calls) - 3 lines (readFile, trim, writeFile) - thread will not be blocked until the file is read and written

3. Using Promises
4.  Using Promisified version of async functions - 3 lines (readFilePromisifiedVersion, trim, writeFilePromisifiedVersion) - thread will not be blocked until the file is read and written

5 . Using Async/Await - 1. readFilePromisifiedVersion, 2. trim, 3. writeFilePromisifiedVersion - thread will not be blocked until the file is read and written
*/

function readFilePromisifiedVersion(filepath,encoding){
        return new Promise((resolve,reject)=>{
                require('fs').readFile(filepath,encoding,(err,data)=>{
                        if(err){
                                reject(err)
                        }else{
                                resolve(data)
                        }
                })
        })
}

function writeFilePromisifiedVersion(filepath,data,encoding){
        return new Promise((resolve,reject)=>{
                require('fs').writeFile(filepath,data,encoding,(err)=>{
                        if(err){
                                reject(err)
                        }
                        else{
                                resolve("File Written Successfully")
                        }
                })
        })
}

async function trimFileContent(filepath,encoding){
        try {
                let data = await readFilePromisifiedVersion(filepath,encoding)
                data = data.trim()
                let result = await writeFilePromisifiedVersion(filepath,data,encoding)
                console.log(result)   
        } catch (error) {
                console.log("ERROR : "+error)
        }       
}



console.log("BEFORE CALLING ASYNC FUNCTION")
trimFileContent("compressor.txt","utf-8").then(data=>{}).catch(err=>{}).finally(data=>{})
console.log("AFTER CALLING ASYNC FUNCTION")