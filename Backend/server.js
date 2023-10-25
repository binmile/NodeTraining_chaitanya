const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express()
app.use(cors())

const db =  mysql.createConnection({
host:"localhost",
user:"Chaitanya",
password:"Bmtuser@123",
database:"ashu"
})

app.get('/',(req,res)=>{
    return res.json("From Backend Side");
})

app.get('/users', (req,res)=>{
    const sql = "SELECT * FROM Employees;"
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
        console.log(data)
    })
})

app.listen(8081,()=>{
    console.log('server is live')
})