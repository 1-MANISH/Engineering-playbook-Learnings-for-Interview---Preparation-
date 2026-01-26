let str=  "hardik"

function convertToHex(str){
        // return Buffer.from(str).toString('hex');

        let binaryString = new TextEncoder().encode(str);
        let hashString = ""
        for(let i = 0 ; i < binaryString.length ; i++){
                hashString += binaryString[i].toString(16).padStart(2, '0');
        }
        return hashString;
        
}
function convertArrayToHex(arr){
        let hashing = ""
        for(let i = 0 ; i < arr.length ; i++){
                hashing += arr[i].toString(16).padStart(2, '0');
        }
        return hashing
}
// 
const byteArray = new TextEncoder().encode(str);
console.log(byteArray);
const byteArray2 = new Uint8Array([104, 97, 114, 100, 105, 107]);
console.log(byteArray2);

console.log(convertToHex(str))
console.log(convertArrayToHex(byteArray))
