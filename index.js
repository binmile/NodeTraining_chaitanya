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
function validate(type,name,req,res){
    name=name.split('.')
    const time = new Date()
    name = name[0]+time.getTime().toString()
   
    const fileBuffer = req.file.buffer;
    const filePath = `public/images/${name}.${type}`;
    fs.writeFile(filePath, fileBuffer, () => {
    res.status(200).send(`File saved successfully.Name: ${name}`);
      });
}


// const upload =multer({dest: './public/images'})
const data = app.post('/',multer().single('image'),(req,res)=>{
    let name = req.file.originalname;
    const ext = req.file.mimetype;
    const size= req.file.size/1000

    if (ext=='image/jpeg' && size<=35){
       validate('png',name,req,res)
    }
    else if(ext!='image/jpeg' && size<=80){
        validate('pdf',name,req,res)
    }
    else{
        res.status(413).send('large file')
    }
    });



app.listen(4000)