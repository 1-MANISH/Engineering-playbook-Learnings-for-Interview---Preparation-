let a = 10
let b = 20

console.log(a)
console.log(b)


setTimeout(()=>{ // async fxn calls
        console.log(a+b)
},1*1000)

// wait for 1 sec then print sum(a,b) - forcefully we are asking CPU to this tasks
// why we are not saying os to do this task - after 1 seconds you can print sum
// let beforeTime = new Date()
// for(let i = 0; i < 1000000; i++){
//         let currentTime = new Date()
//         if(currentTime-beforeTime>=1000){
//                 break;
//         }
// }

// print sum
// console.log(a+b)