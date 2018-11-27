
// gets only third argument
// const [, , URL] = process.argv;
let URL = 'https://gazelle.ihe.net/sonar/api/rules/search?languages=js&'
const async = require("async");
const request = require("request").defaults({ json: true });


let pageIndex = 0;
const results = [];
let pageSize = 20

function start_requesting() {
	request(`${URL}&pageIndex=${1}&pageSize=&{pageSize}`,
		(err, { statusCode }, result) => {
			let body = JSON.stringify(result);
			results.push(...result.rules);
			let pageNumbers = Array.from({length: body.total/pageSize}, (v, k) => k+1);

			let tasks = pageNumbers.map((pageNumber) => {

				// each number will result in new function
				return (callback) => {
					request(`${URL}&pageIndex=${pageNumber}`,
						(err, { statusCode }, result) => {
							if (err || statusCode !== 200)
								callback(err || new Error(statusCode));

							results.push(...result.rules);
							callback(null, results);
						});
				};
			});

			async.parallelLimit(tasks, 4, function(err, results) {
				if (err) throw err;
				console.log("Result: ", JSON.stringify(results, null, 2));
			});

		});
}




