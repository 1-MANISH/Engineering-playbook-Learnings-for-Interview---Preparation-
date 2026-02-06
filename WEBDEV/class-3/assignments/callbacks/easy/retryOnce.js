// Problem Description – Retry Async Function Once

// You are given an asynchronous function fn. Your task is to return a new function that calls fn and retries it once if the first attempt fails. 
// If the second attempt also fails, the error should be properly propagated. 

function retryOnce(fn) {

       return async function(...args){
                const callback = args[args.length-1];

                let called = false;

                const tryFunc = (attempt)=>{
                        fn(...args.slice(0,-1),(err,data)=>{
                                
                                if(!err || attempt===0){
                                      if(!called){
                                                called = true;
                                                callback(err,data)
                                      }
                                }else{
                                        tryFunc(attempt-1)
                                }
                        })
                }

                tryFunc(1)
       }
}

module.exports = retryOnce;
