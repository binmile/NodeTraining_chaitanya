const path = require('path');
const express = require('express');
const bodyParser =  require('body-parser')
const multer = require('multer')

const app = express()

const fs = require('fs');
const { time } = require('console');

app.use(
    bodyParser.urlencoded({
        extended:true
    })
)
function validate(name,ext,req,res){
    name=name.split('.')
    const time = new Date()
    name = name[0]+time.getTime().toString()
    const fileBuffer = req.file.buffer;
    const filePath = `public/images/${name}.${ext}`;
    fs.writeFileSync(filePath, fileBuffer,
    res.status(200).send(`File saved successfully.Name: ${name}`));
      return name
}


// const upload =multer({dest: './public/images'})
const data = app.post('/',multer().single('file'),(req,res)=>{
    let name = req.file.originalname;
    let ext = req.file.mimetype;
    var parts = ext.split('/');
    ext = parts[1];
    const size= req.file.size/1000
    if (ext=='image/jpeg' && size<=35){
        const path= validate(name,ext,req,res)
    }
    else if(ext!='image/jpeg')
    {
        const value= validate(name,ext,req,res)
        const pdfparse = require('./pdfParse.js')
        pdfparse(`./public/images/${value}.pdf`)

    }
    else{
        res.status(413).send('large file')
    }
    });



app.listen(4000)