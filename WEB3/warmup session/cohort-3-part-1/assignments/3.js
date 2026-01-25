
const crypto = require('crypto');
/*
What if I ask you to find a nonce for the following input - 
harkirat => Raman | Rs 100
Ram => Ankit | Rs 10

*/

function findHashWithPrefix(prefix){

        let input = 0  , count = 1;
        while(count<=100){
                let inputStr = `
                        harkirat => Raman | Rs 100
                        Ram => Ankit | Rs 10
                        Nonce : ${input}
                `;
                let hash = crypto.createHash('sha256').update(inputStr).digest('hex');
                if(hash.startsWith(prefix)){
                        console.log(`Hash: ${hash} found with Nonce: ${input}`);
                        break;
                }
                console.log("Attempt "+inputStr+" "+" | "+ count+"    "+ hash );
                count++;
                input ++;
        }
}

console.log("Finding hash with prefix 0000");
findHashWithPrefix("00000");