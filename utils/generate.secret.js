
const crypto = require('crypto')
//Here we are creating secretkey with random hex numbers
//We copied secret key number from console.table() and added to .env file 
const secretKey = crypto.randomBytes(32).toString('hex')
console.table(secretKey);