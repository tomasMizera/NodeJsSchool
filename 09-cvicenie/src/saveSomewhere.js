 const async = require("async");
 const fs = require("fs");
 module.exports = saveSomewhere;

 function saveSomewhere( paths, data, cb ) {
 	
 	let tasks = paths.map(( path ) => {
 		return ( fe_cb ) => {
 			fs.writeFile( path, data, "utf8", ( err )=>{
 				// if( err ) fe_cb( err );
 				// else fe_cb( null, path );
 				fe_cb( err, path );
 			});
 		}});
 	async.tryEach(tasks,cb);
 }