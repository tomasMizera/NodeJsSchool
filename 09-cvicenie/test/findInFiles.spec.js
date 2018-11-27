const fileSearch = require('../src/findInFiles.js');
const assert = require('assert');

describe('Find specific file in directories', function() {

	paths = [
		"/home", 
		"/tmp",
		`${__dirname}` + "/../..", 
		`${__dirname}` + "/../../07-cvicenie-streams", 
		`${__dirname}` + "/.."
	];

	possible_outcomes = [
		`${__dirname}` + "/../../07-cvicenie-streams/findMe.txt", 
		`${__dirname}` + "/../findMe.txt"
	];

	it('Should return first entry containing the right file', function(done) {
		fileSearch.findFirstFile(paths, "findMe.txt", "catchMeIfYouCan", (err, result) => {
			if(err) return done(err);
			if(result) {
				assert(possible_outcomes.indexOf(result) >= 0);
				done();
			}
		});	
	});

	it('Find files should not accept a half solution', function(done) {
		fileSearch.findFirstFile([`${__dirname}` + "/../.."], "findMe.txt", "catchMeIfYouCan", (err, result) => {
			if(err) return done();
			assert(result.length === 0);
			done()
		});
	});

	it('Should return all entries containing the right files', function(done) {
		fileSearch.findAllFiles(paths, "findMe.txt", "catchMeIfYouCan", (err, results) => {
			if(err) return done(err);
			if(results) {
				results.forEach((result) => {
					assert(possible_outcomes.indexOf(result) > -1);
				});
				done();
			}
		});	
	});
});

