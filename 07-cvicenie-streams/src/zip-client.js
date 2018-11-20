const http = require( 'http' );
const fs = require( 'fs' );

// let file = fs.createReadStream(process.argv[2]); 
let file = fs.createReadStream( 'file.txt' );

let url = "http://localhost:9999";
let request = http.request( url, { method: "POST" } )
request.on( "response", (res) => {
	// response is Readable
	res.pipe( process.stdout );
});


// request is Writable
file.pipe( request );
