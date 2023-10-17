const path = require('path');
const express = require('express');
const bodyParser =  require('body-parser')
const multer = require('multer')

const app = express()

const fs = require('fs');
const { createHmac } = require('node:crypto');
const crypto=require("crypto")

app.use(express.json())

app.use(
    bodyParser.urlencoded({
        extended:true
    })
)

// cypher iv
app.post('/encrypt',(req,res)=>{
        let key=crypto.randomBytes(32)
        let iv=crypto.randomBytes(16)
        let cipher=crypto.createCipheriv("aes-256-cbc",key,iv)
    let encryptedData = cipher.update(req.body.data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    console.log(encryptedData.toString('hex'))
    res.json(
        {
            "encryptedData":encryptedData,
            "key":key.toString('hex'),
            "iv":iv.toString('hex')
        })

})

// decypher iv

app.post('/decrypt',(req,res)=>{
    let key = Buffer.from(req.body.key, 'hex');
    let iv = Buffer.from(req.body.iv, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decryptedData = decipher.update(req.body.encryptpassword , 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    console.log(decryptedData);
    res.send(decryptedData);

})
app.listen(6000)