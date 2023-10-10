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
    fs.writeFile(filePath, fileBuffer, () => {
    res.status(200).send(`File saved successfully.Name: ${name}`);
      });
}


// const upload =multer({dest: './public/images'})
const data = app.post('/',multer().single('file'),(req,res)=>{
    let name = req.file.originalname;
    let ext = req.file.mimetype;
    var parts = ext.split('/');
    ext = parts[1];
    const size= req.file.size/1000
    if (ext=='image/jpeg' && size<=35){
       validate(name,ext,req,res,ext)
    }
    else if(ext!='image/jpeg' && size<=80){
        validate(name,ext,req,res)
    }
    else{
        res.status(413).send('large file')
    }
    });



app.listen(4000)