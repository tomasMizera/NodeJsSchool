const http = require("http");
const fs = require('fs');
let file = fs.createReadStream(process.argv[2]);
let url = "http://localhost:8000";

const options = {
    hostname: url,
    method: 'POST',
};

let request = http.request(options);
request.on("response", (res) => {
    res.pipe(process.stdout);
});
file.pipe(request);