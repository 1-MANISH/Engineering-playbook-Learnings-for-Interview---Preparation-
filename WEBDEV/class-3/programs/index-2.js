function sum(a,b){
        return a+b
}

function sub(a,b){
        return a-b
}

function doArithmetic(a,b,whatToDo){
        // if(whatToDo == "sum"){
        //         return sum(a,b)
        // }else if(whatToDo == "sub"){
        //         return sub(a,b)
        // }
        return whatToDo(a,b)
}

const ans1 = doArithmetic(10,20,sum)
const ans2 = doArithmetic(10,20,sub)
console.log(ans1)
console.log(ans2)
// function are first class citizens in JS
// so we can pass functions as arguments to another function