// Problem Description – once(fn)

// You are required to implement a wrapper function named once that accepts an asynchronous function fn.
// The wrapper should ensure that fn is executed only on the first call.
// Any subsequent calls must not re-execute fn and should instead return the same Promise or resolved result from the first invocation.
function once(fn) {

        let called  = false;
        let result = null;
        let error = null
        return async (...args) => {
                const callback = args[args.length-1];

                if(typeof callback !== "function"){
                        throw new Error("callback must be a function")
                }
                if(called){
                        return callback(error,result);
                }
                called = true;
       
                fn(...args.slice(0,-1),(err,data)=>{
                        if(err){
                                error = err;
                        }else{
                                result = data
                        }
                        callback(err,data)
                })
        }
}

module.exports = once;
