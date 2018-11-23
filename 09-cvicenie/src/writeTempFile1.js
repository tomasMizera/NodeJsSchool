module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");
const async = require( 'async' );


function writeTempFile(fileName, data, opts, cb /* data, options, callback*/ ) {
	// let cb = args.pop();

	let tempDir = path.join(os.tmpdir(), `${process.pid}-`);
	
	async.waterfall([
			(callback) => {
				fs.mkdtemp(tempDir, callback);
				
			},
			(path, callback) => {
				let filePath = path + '/' + fileName;
				console.log(filePath);
				try{
					fs.writeFile( filePath, ...opts, (err) => {
			    		if (err) throw err;
			    		callback(null, filePath);
			    	})
				} catch(err) {
					cb(err);
				}
			}
		],
		function(err, result) {
			console.log("What ", result);
			cb(err, result);
		});

  }
  console.log(writeTempFile.length);