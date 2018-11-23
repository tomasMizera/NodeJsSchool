module.export = findingFiles;

const fs = require( 'fs' );
const async = require( 'async' );


function findingFiles(dirs, filename, str, cb) {
	
	let tasks = dirs.map(( dir ) => {
		return ( callback ) => {

			fs.readdir( dir, 'utf8', ( err, files ) => {
				if (err) callback(err);
				if ( files.indexOf( filename ) > -1 ) {

					let filePath = dir + '/' + files[files.indexOf(filename)];
					
					fs.readFile(filePath, function (err, data) {
						if (err) callback(err);
						if(data.indexOf('catchMeIfYouCan') >= 0){
							// console.log(filePath);
							callback(null, filePath);
						}
					});
				}
			})};
		});

	async.race(tasks, (err, result) => {
		// console.log("received: ", err, " - ", result);
		if ( err ) {
			console.log("Fuck!");
			cb( null );
		}
		cb( result );
	});
}


paths = ["/home/tomasmizera", 
"/tmp", 
"/home/tomasmizera/school/zs_1819/wawjs/repo/node_tasks/07-cvicenie-streams", 
"/home/tomasmizera/school/zs_1819/wawjs/repo/node_tasks/09-cvicenie",
"/home/tomasmizera/school/zs_1819/wawjs/repo/node_tasks"];

findingFiles(paths, "findMe.txt", "catchMeIfYouCan", (result) => {
	if( result ) console.log("Successfull run, here: ", result);
});