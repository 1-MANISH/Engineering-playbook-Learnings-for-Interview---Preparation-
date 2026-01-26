// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

let counter = 0;
function updateCounter(){
        counter++;
        console.log(counter);
}

for(let i=0;i<10;i++){
        setTimeout(updateCounter,i*1000);
}