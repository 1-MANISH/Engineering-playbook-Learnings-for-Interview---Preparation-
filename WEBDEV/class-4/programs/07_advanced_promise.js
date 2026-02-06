

console.log("STARTED")
setTimeout(()=>{
        console.log(`2:TIMEOUT MACROTASK`);
},0)

Promise.resolve().then(()=>{
        console.log(`3: PROMISE MICROTASK`);
})

console.log('ENDED')