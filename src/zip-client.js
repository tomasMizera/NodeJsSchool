/*

const http = require( 'http' );
const fs = require( 'fs' );
let file = fs.createReadStream( process.argv[2] );
let url = 'http://localhost:8000';

const options = {
    hostname: url,
    method: 'POST',
};

let request = http.request( options )
request.on( "response", ( res ) => {
   	res.pipe( process.stdout );
});

file.pipe( request );

*/


const http = require("http");
const fs = require('fs');

let file = fs.createReadStream(process.argv[2]); 

let url = "http://localhost:9999";
let request = http.request(url, { method: "POST" })
request.on("response", (res) => {
	// response is Readable
	res.pipe(process.stdout);
});


// request is Writable
file.pipe(request);
