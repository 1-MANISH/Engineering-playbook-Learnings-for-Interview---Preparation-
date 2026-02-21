// readFile -> async
// readFileSync->sync
let totalTimeout = 0 ;

function setTimeoutPromisified(milliSecond){
  
        return new Promise((resolve,reject)=>{
                setTimeout(() => {
                resolve(milliSecond)
                }, milliSecond);
        })
  
}

setTimeoutPromisified(1000).then(data=>{
        console.log("DATA1 : "+data)
        totalTimeout+=data
        return setTimeoutPromisified(2000)
}).then(data=>{
        console.log("DATA2 : "+data)
        totalTimeout+=data
        return setTimeoutPromisified(3000)
}).then(data=>{
        console.log("DATA3 : "+data)
        totalTimeout+=data
}).catch(err=>{
        console.log("ERROR : "+err)
}).finally(()=>{
        console.log("Total Time : "+totalTimeout)
})