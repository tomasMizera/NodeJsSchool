 const async = require("async");
 const fs = require("fs");

 module.exports = saveSomewhere;

 function saveSomewhere(paths, data, cb) {
 	
 	let tasks = paths.map((path) => {
 		return (cb) => {
 			fs.writeFile( path, data, "utf8", ( err )=>{
 				cb( err, path );
 			});
 		}});

 	async.tryEach(tasks,cb);
 }