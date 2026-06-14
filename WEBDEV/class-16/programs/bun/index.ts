
// # Function take another function as an argument

// function delayedCall(fn:()=>void,delay:number):void{
//         setTimeout(fn,delay);
// }

// delayedCall(()=>{
//         console.log("This message is delayed by 2 seconds.");
// },2000)


//  # Type inference in TypeScript

// let message = "Hello, TypeScript!"; // TypeScript infers the type as string
// console.log(message);

// function isLegal(age:number): boolean {
//         return age >= 18;
// }

// console.log(isLegal(20)); // Output: true

// # How to assign a return type to a function


// function sum(a:number , b:number) : number {
//         return a+b;
// }

// let result :number = sum(5, 10);
// console.log(result);


// #  How to give types to arguments of a function

// function greet(firstName:string) {
//         console.log(`Hello, ${firstName}!`);
// }

// greet("John");