
/*
**Write code that**

1. logs `hi` after 1 second
2. logs `hello` 3 seconds after `step 1`
3. logs `hello there` 5 seconds after `step 2`

*/

// solution one
function AfterOneSeconds(callback){
        setTimeout(callback,1000)
}
function AfterThreeSeconds(callback){
        setTimeout(callback,3000)
}
function AfterFiveSeconds(callback){
        setTimeout(callback,5000)
}

AfterOneSeconds(()=>{
        console.log("hi")
        AfterThreeSeconds(()=>{
                console.log("hello")
                AfterFiveSeconds(()=>{
                        console.log("hello there")
                })
        })
})

// solution two

function setTimeoutPromisified(ms){
        return new Promise((resolve,reject)=>{
                setTimeout(resolve,ms)
        })
}

setTimeoutPromisified(1000).then(()=>{
        console.log("hi")
        return setTimeoutPromisified(3000)    
}).then(()=>{
        console.log("hello")
        return setTimeoutPromisified(5000)
}).then(()=>{
        console.log("hello there")
})

