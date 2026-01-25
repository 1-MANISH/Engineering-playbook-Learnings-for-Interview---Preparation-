const crypto = require('crypto');

function createHash(input){
        const hash = crypto.createHash('sha256').update(input).digest('hex')
        return hash
}

// we want to give input such that the input string start with "100xdev"
let input = 0 ;
let count = 1;
while(count<=100){
        const inputStr = '100xdev'+input.toString();
        const hash = createHash(inputStr);
        if(hash.startsWith('00000')){
                console.log(`Input: ${input}`);
                console.log(`Hash: ${hash}`);
                break;
        }
        console.log("Attempt "+inputStr+" "+" | "+ count+"    "+ hash );
        count++;
        input ++;
}