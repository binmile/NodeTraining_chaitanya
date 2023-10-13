var zlib = require('zlib');
var fs = require('fs');

var gzip = zlib.createGzip();
var r = fs.createReadStream('../output/count.txt');
var w = fs.createWriteStream('../output/mygzipfile.txt.gz');
r.pipe(gzip).pipe(w);

