
/*

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


 */
const p = new Promise((resolve,reject)=>{
        resolve()
        reject()
})

p.then(()=>{
        // some thing
        return new Promise((resolve,reject)=>{
                
        })
})
.then(()=>{
        // some thing
})
.catch(()=>{
        // some thing
})

class MyPromise{

        constructor(executorFunction){

                this.executorFunction = executorFunction
                this.successCallback = null
                this.errorCallback = null

                this.executorFunction(()=>{
                        this.successCallback()
                },()=>{
                        this.errorCallback()
                })

        }

        then(callback){
                this.successCallback = callback
        }

        catch(callback){
                this.errorCallback = callback
        }

}

function setTimeoutPromisified(ms){
        return new MyPromise((resolve,reject)=>{
                setTimeout(resolve,ms)
        })
}

setTimeoutPromisified(2000).then(()=>{
        console.log("hi")
})