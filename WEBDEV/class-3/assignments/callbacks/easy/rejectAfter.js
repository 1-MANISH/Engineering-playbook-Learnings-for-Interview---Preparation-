// Problem Description – rejectAfter(ms)

// You are required to create a function named rejectAfter that accepts a time duration in milliseconds. 
// The function should return a Promise that waits for the specified time and then rejects.

function rejectAfter(ms, callback) {
        const p =  new Promise((resolve, reject) => {
                setTimeout(() => {
                      reject(new Error(`Rejected after ${ms}ms`))
                },ms)
        })

        if(typeof callback === "function"){
                p.then(res=>callback(null,res))
                .catch(err=>callback(err,null))
        }
        return p
}

module.exports = rejectAfter;

