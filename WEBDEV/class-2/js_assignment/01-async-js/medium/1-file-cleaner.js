// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs')

// Read the contents of a file -  async
fs.readFile('./input.txt','utf-8',function(err,data){
        if(err){
                console.log(err)
                return
        }
        
        // write content of file 
        let strArray = data.split(' ');
        let newStr = ""
        for(let word of strArray){
                if(word!="")newStr+=word;
        }
        fs.writeFile('./input.txt',newStr,function(err,data){
                if(err){
                        console.log(err)
                        return
                }
                console.log(data)
        })
})
