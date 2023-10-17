const express=require('express');
const crypto=require('crypto')
const bodyparse=require('body-parser')
const app=express()
app.use(bodyparse.json())
app.post('/',(req,res)=>{
    const password=req.body.password
    const algorithm='aes-256-cbc'
    const key=crypto.randomBytes(32);
    const iv=crypto.randomBytes(16)
    const cipher=crypto.createCipheriv(algorithm,key,iv)
    let encryptedPassword=cipher.update(password,'utf-8','hex')
    encryptedPassword+=cipher.final('hex')
    res.json({
        encryptedPassword,
        key:key.toString('hex'),
        iv:iv.toString('hex')
    })
})

app.listen(5000)