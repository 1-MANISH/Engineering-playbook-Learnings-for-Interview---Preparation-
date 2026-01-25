// hashing

const crypto = require('crypto');

const hash = crypto.createHash('sha256').update('100xdev').digest('hex')

console.log(hash)