const crypto = require('crypto');

const key  =crypto.randomBytes(32);
const initialVector = crypto.randomBytes(16);

function encryptData(text){

        const cipher = crypto.createCipheriv('aes-256-cbc', key, initialVector);
        let encryptedText = cipher.update(text,'utf-8','hex');
        encryptedText += cipher.final('hex');
        return encryptedText
}

function decryptData(encryptedText){
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, initialVector);
        let decryptedText = decipher.update(encryptedText,'hex','utf-8');
        decryptedText += decipher.final('utf-8');
        return decryptedText;
}

const originalText = 'hellow'
const encryptedText = encryptData(originalText);
const decryptedText = decryptData(encryptedText);
console.log(originalText);
console.log(encryptedText);
console.log(decryptedText);