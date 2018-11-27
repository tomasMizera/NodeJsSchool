const fs = require( 'fs' );
const async = require( 'async' );
const path = require('path');

module.exports = {
	findFirstFile,
	findAllFiles
};

function getTasks(dirs, filename, str) {
	let tasks = dirs.map((dir) => {
		return (callback) => {

			fs.readdir(dir, 'utf8', (err, files) => {
				if (err || files.indexOf(filename) < 0) callback (err, null);

				else {
					let filePath = dir + '/' + files[files.indexOf(filename)];
					
					fs.readFile(filePath, function (err, data) {
						if (err || data.indexOf(str) < 0) callback (err, null);
						else callback(null, filePath);
					})	
				}
			});

			//TODO refactor: async waterfall + path.join
		};
	});
	return tasks;
}

function findFirstFile(dirs, filename, str, cb) {

	findAllFiles(dirs, filename, str, (err, result) => {
		if (result.length > 0) 
			cb(err, result[0]);
		else
			cb(err, result);
	});
}

function findAllFiles(dirs, filename, str, cb) {
	async.parallel(getTasks(dirs, filename, str), (err, results) => {
		
		// vyfiltrujem vsetky null hodnoty v poli
		results = (results.filter(element => element));
		cb(err, results)
	});
}
