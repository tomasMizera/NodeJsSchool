module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");
const async = require( 'async' );


function writeTempFile(fileName, data, opts, cb) {
	let tempDir = path.join(os.tmpdir(), `${process.pid}-`);
	
	async.waterfall([
		// Create a temp directory
		(callback) => {
			fs.mkdtemp(tempDir, callback);
		},
		// Write file to temp directory
		(path, callback) => {
			let filePath = path + '/' + fileName;
			try{
				fs.writeFile( filePath, data, opts, (err) => {
					if (err) throw err;
					callback(null, filePath);
				})
			} catch(erro) {
				callback(erro);
			}
		}
		],
		function(err, result) {
			cb(err, result);
		}
	);
}
