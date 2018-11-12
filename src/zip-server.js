const fs = require('fs');
const http = require("http");

const zlib = require("zlib");
const {
  createDeflate, createInflate, 
  createGzip,createGunzip,
  createUnzip
} = require("zlib");

let destFile = fs.createWriteStream('requested.txt');


let server = http.createServer()
server.listen(9999, "localhost")
  .on("request", (req, res) => {
    // request is Readable
    // response is Writable
   	req.pipe(createGzip()).pipe(res);
  })
  .on( 'request', (req, res) => {
  	console.log('requested file save');
  	req.pipe( destFile );
  });
