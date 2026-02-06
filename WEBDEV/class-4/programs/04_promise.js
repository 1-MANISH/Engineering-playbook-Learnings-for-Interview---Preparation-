
function setTimeoutPromisified(ms){
        return new Promise((resolve,reject)=>{
                setTimeout(resolve,ms)
        })
}

function callback() {
	console.log("3 seconds have passed");
}

setTimeoutPromisified(3000).then(callback)


function returnPromise(ms){
        return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                        resolve("FROM PROMISE")
                },ms)
        })
}

function callbackSuccess(data){
        console.log(data)
}
function callbackFailure(data){
        console.log(data)
}

const p = returnPromise(3000)
// p.then(callbackSuccess)
// .catch(callbackSuccess)

p.then((data)=>{
        console.log(data)
})
.catch((err)=>{
        console.log(err)
})