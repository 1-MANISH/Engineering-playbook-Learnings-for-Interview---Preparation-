
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

async function printSomethingInGap(){

        totalTimeout+=await promisifiedSetTimeout(1000);
        totalTimeout+=await promisifiedSetTimeout(2000);
        totalTimeout+=await promisifiedSetTimeout(3000);

        console.log("Total Time : "+totalTimeout)

}

printSomethingInGap().then(data=>{}).catch(err=>{}).finally(data=>{})