const crypto = require('crypto');

function createHash(input){
        const hash = crypto.createHash('sha256').update(input).digest('hex')
        return hash
}

// we want to give input such that hash starts with '0000'
let input = 0;
let count = 1;
while(count<=100){
        const hash = createHash(input.toString());
        if(hash.startsWith('00000')){
                console.log(`Input: ${input}`);
                console.log(`Hash: ${hash}`);
                break;
        }
        console.log("Attempt "+input+" "+" | "+ count+"    "+ hash );
        count++;
        input++;
}