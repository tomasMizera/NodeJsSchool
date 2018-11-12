// const zipfile = archiver('zip');
const http = require("http");
const {
    createGzip,
} = require("zlib");
const fs = require("fs");

let newFile = fs.createWriteStream("data-new.txt");
let server = http.createServer();
server.listen(8000, "localhost")
    .on("request", (req, res) => {
        req.pipe(newFile);
        req.pipe(createGzip()).pipe(res);
    });