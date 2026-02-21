
// async - await

let totalTimeout = 0
function promisifiedSetTimeout(milliSecond){
        return new Promise((res)=>{
                setTimeout(()=>{
                        console.log('INSIDE SETTIMEOUT : '+milliSecond)
                        res(milliSecond)
                },milliSecond)
        })

}


// save use from promise chaining and callback hell
async function printSomethingInGap(){

        try {
                totalTimeout+=await promisifiedSetTimeout(1000);//wait and then move to next line of code
                totalTimeout+=await promisifiedSetTimeout(2000);// wait and then move to next line of code
                totalTimeout+=await promisifiedSetTimeout(3000);// wait and then move to next line of code

                console.log("Total Time : "+totalTimeout)
        } catch (error) {
                console.log("ERROR : "+error)
        }

}
console.log("BEFORE CALLING ASYNC FUNCTION")
printSomethingInGap().then(data=>{}).catch(err=>{}).finally(data=>{})
console.log("AFTER CALLING ASYNC FUNCTION")