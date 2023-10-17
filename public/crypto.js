const { createHmac } = require('node:crypto');
const crypto=require("crypto")


const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('Starting with crypto')
               .digest('hex');
console.log(hash);

const password="hey123bedb"


// cypher            
const myKey=crypto.createCipher("aes-128-cbc",password)
let mystr=myKey.update("Text to be encrypted","utf-8",'hex')
mystr += myKey.final('hex')
console.log(mystr,'******************')

//   decipher
let myKey1=crypto.createDecipher("aes-128-cbc",password)
let myStr1=myKey1.update(mystr,'hex','utf-8')
myStr1+=myKey1.final('utf-8')
console.log(myStr1)

// cypher iv
let key=crypto.randomBytes(32)
let iv=crypto.randomBytes(16)
let cipher=crypto.createCipheriv("aes-256-cbc",key,iv)
let encryptedData=cipher.update("Encryption with iv")
encryptedData=Buffer.concat([encryptedData,cipher.final()])
console.log(encryptedData.toString('hex'))

// decypher iv
let decipher=crypto.createDecipheriv("aes-256-cbc",key,iv)
let decryptedData=decipher.update(encryptedData,'hex','utf-8')
decryptedData +=decipher.final('utf-8')
console.log(decryptedData)