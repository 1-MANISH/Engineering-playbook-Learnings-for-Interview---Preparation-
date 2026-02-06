

function setTimeoutPromisified(ms){
        return new Promise((res,rej)=>setTimeout(res,ms))
}


async function solve(){
        const res = await setTimeoutPromisified(1000)
        console.log(`Hi`)
        const res2 = await setTimeoutPromisified(3000)
        console.log(`Hello`)
        const res3 = await setTimeoutPromisified(5000)
        console.log(`Hello there`)

        // return Promise.resolve()
        return "DONE"
}

solve()
.then((data)=>console.log(data))
.catch(()=>console.log("error"))