const express = require('express');
const cors = require('cors');

const app = express()
app.use(cors())
const bodyParser = require("body-parser");
const downloadVideo = require('./code');

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );



app.get('/',(req,res)=>{
    return res.json("From Backend Side");
})




app.listen(8000,()=>{
    console.log('server is live')
})
require('./code')

app.get('/link',downloadVideo)
