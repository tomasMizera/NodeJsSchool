module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");


function writeTempFile(fileName, ...args /* data, options, callback*/ ) {
	let cb = args.pop();

	let tempDir = path.join(os.tmpdir(), `${process.pid}-`);
	// fs.mkdtemp(tempDir, (err, folder) => {

  }
  // console.log(writeTempFile.length);