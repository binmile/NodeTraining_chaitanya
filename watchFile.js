const fs = require('fs');
const stream = require('node:stream');


module.exports = function(){
    fs.watchFile('./output/count.txt',{},
    (curr,prev) =>{
        console.log('prev:',prev.mtime)
        console.log('curr:',curr.mtime)
        console.log(  "The contents of the current file are:")
        if (curr.mtime > prev.mtime) {
            const newData = fs.readFileSync("./output/count.txt", "utf-8");
            const data = fs.createReadStream("./output/count.txt")

            const finalData = newData;
            fs.writeFileSync("./output/sample.txt", finalData + '@');
            // const write = fs.createWriteStream("./output/sample.txt");
            // data.pipe(write)
          }
    } )}