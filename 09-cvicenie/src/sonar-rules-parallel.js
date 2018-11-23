
// gets only third argument
// const [, , URL] = process.argv;
let URL = 'https://gazelle.ihe.net/sonar/api/rules/search?languages=js&'
const { parallelLimit } = require("async");
const request = require("request").defaults({ json: true });


let pageIndex = 0;
const results = [];
let pageNumbers = [...Array(10).keys()];
let tasks = pageNumbers.map( (pageNumber) => {
	// each number will result in new function
	return (callback) => {
		console.log("tu som");
		request(`${URL}&pageIndex=${pageNumber}`,
			(err, { statusCode }, result) => {
				if (err || statusCode !== 200)
					callback(err || new Error(statusCode));


// FUNCTIONS ARE ATOMIC!!!!!!!!!
// TAKZE NO PROBLEMO....skoro


				results.push(...result.rules);
				// pageIndex++;
				console.log(results);
				callback(null, result);
			});
	};
});

parallelLimit( tasks, 4, function(err) {
		if ( err ) throw err;
		console.log( JSON.stringify( results, null, 2 ));
	});

