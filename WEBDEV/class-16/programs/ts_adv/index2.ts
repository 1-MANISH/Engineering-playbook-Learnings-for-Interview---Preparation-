
// problem
// type Input = number | string 
// function firstElement(arr:Input[]){
//         return arr[0]
// }

// const value = firstElement([1,"manish",2,3])
// console.log(value.toUpperCase());

// solution
// way-1
// function firstElement(arr:number[] | string[]){
//         return typeof arr[0] === "string" ? arr[0] :    arr[0]+"";
// }
// // const value = firstElement([1"manish",3])
// const value1 = firstElement([1,2,3])
// const value2 = firstElement(["hardik","manish"])
// console.log(value2.toUpperCase());


// way-2
function firstElement<T>(arr:T[]):T|undefined {
        return arr[0]
}

const value1 = firstElement<number>([1,2,3])
const value2 = firstElement<string>(["hardik","manish"])
const value3 = firstElement<number|string>(["hardik",1,2,"manish"])
console.log(value2?.toUpperCase());

