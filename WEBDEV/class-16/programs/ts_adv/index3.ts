function Identity<T>(arg:T):T {
        return arg;
}

let output1 = Identity<string>("Hello Hardik")
let output2 = Identity<number>(123)

console.log(output1.toUpperCase())
console.log(output2.toFixed(2))