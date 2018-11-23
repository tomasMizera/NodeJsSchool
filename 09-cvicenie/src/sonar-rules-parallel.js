const [, , URL] = process.argv;

const { parallelLimit } = require("async");
const request = require("request")
  .defaults({ json: true });


let pageIndex = 0;
const results = [];

parallelLimit(tasks, 4, callback
	);