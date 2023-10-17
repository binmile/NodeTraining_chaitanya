const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const app = express()
app.use(cors())

const sequelize = new Sequelize({
    host:"localhost",
    user:"Chaitanya",
    password:"Bmtuser@123",
    database:"ashu"
  });

app.get('/',(req,res)=>{
    return res.json("From Backend Side");
})

// app.get('/users', (req,res)=>{
//     const sql = "SELECT * FROM Employees;"
//     db.query(sql,(err,data)=>{
//         if(err) return res.json(err);
//         return res.json(data);
//         console.log(data)
//     })
// })
 sequelize = new Sequelize('sqlite::memory:', {
    // Choose one of the logging options
    logging: console.log,                  // Default, displays the first parameter of the log function call
    logging: (...msg) => console.log(msg), // Displays all log function call parameters
    logging: false,                        // Disables logging
    logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
    logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages
  });

app.listen(8081,()=>{
    console.log('server is live')
})