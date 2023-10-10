const fs = require("node:fs")
// const content = fs.readFileSync('./file.txt','utf-8')
// async
const content2 = fs.readFile('../input/file.txt','utf-8',(err,data)=>{
   console.log(data)
})
// console.log(content)

// flaga=> append

// fs.writeFileSync('./greet.txt',' hello brother',{flag:'a'})
// fs.writeFileSync('./file.txt','hello brather')

const fs2 = require('node:fs/promises')

// fs2.readFile('greet.txt','utf-8')
// .then(data => console.log(data))
// .catch(error => console.log(error))

async function readFile(){
  try{
    const data = await fs2.readFile('../input/file.txt','utf-8')
    console.log(data)
  }
  catch(err){
    console.log(err)
  }
}

readFile();


// creating folder
// fs.mkdirSync('creatingfolder')

// creating file 
// fs.writeFileSync('creatingfolder/file.txt','Dummy data inside file');

// updating file
// fs.appendFileSync('creatingfolder/file.txt',' appended text at the end.')

// reading data 
const Data = fs.readFileSync('../output/myFile.txt','utf-8');
console.log(Data)

// rename file
// fs.renameSync('creatingfolder/file.txt','creatingfolder/myFile.txt')

// delete file
// fs.unlinkSync('file.txt');

// deleting folder
// fs.mkdirSync('Deletethis')
// fs.rmdirSync('Deletethis')


// moving files from one directory to another
// fs.renameSync('creatingfolder/myFile.txt','myFile.txt')

// fs.mkdirSync('public')
// fs.renameSync('practice.js','public/practice.js')
// fs.renameSync('pathModule.js','public/pathModule.js')
// fs.renameSync('eventModule.js','public/eventModule.js')
// fs.renameSync('fSys.js','public/fSys.js')

// fs.mkdirSync('output')
// fs.renameSync('greet.txt','output/greet.txt')
// fs.renameSync('myFile.txt','output/myFile.txt')


// fs.mkdirSync('../input')
// fs.renameSync('../file.txt','../input/file.txt')

