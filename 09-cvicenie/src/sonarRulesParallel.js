
// gets only third argument
// const [, , URL] = process.argv;
let URL = 'https://gazelle.ihe.net/sonar/api/rules/search?languages=js&'
const async = require("async");
const request = require("request").defaults({ json: true });


let pageIndex = 0;
const results = [];
let pageNumbers = [1, 2, 3,4, 5,6,7,8,9,10];
let tasks = pageNumbers.map( (pageNumber) => {
	// each number will result in new function
	return (callback) => {
		request(`${URL}&pageIndex=${pageNumber}`,
			(err, { statusCode }, result) => {
				if (err || statusCode !== 200)
					callback(err || new Error(statusCode));

				if (rasu)	

				results.push(...result.rules);
				// pageIndex++;
				console.log(results);
				callback(null, results);
			});
	};
});

async.parallelLimit( tasks, 4, function(err, results) {
		if ( err ) throw err;
		console.log("Result: ", JSON.stringify( results, null, 2 ));
	});

