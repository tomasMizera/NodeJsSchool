

// gets only third argument
const [, , URL] = process.argv;

const { parallelLimit } = require("async");
const request = require("request")
			.defaults({ json: true });


let pageIndex = 0;
const results = [];

parallelLimit(
	(callback) => {
		callback(err);
	},

	// limit of tasks at the time
	4, 

	// callback
	function(err) {
		if ( err ) throw err;
		console.log( JSON.stringify( results, null, 2 ));
	});

// fs.writeFile(file, data[, options], callback)
// replacing the file if it already exists. 
// data can be a string or a buffer.
// It is unsafe to use fs.writeFile() multiple times 
// 	on the same file, without waiting for the callback

fs.writeFile(outPath, outData, (err) => {
    if (err) throw err;
    console.error('written:', outPath);
});
