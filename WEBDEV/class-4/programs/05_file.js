const fs = require('fs')

// let content = fs.readFileSync('a.txt','utf-8')
// console.log(content)

console.log("START")


// its like promise - eventual completion or failure
function afterFileRead(err,data){
        if(err){
                console.log(err)
        }else{
                console.log(data)
        }
}

fs.readFile('a.txt','utf-8',afterFileRead)


console.log("END")