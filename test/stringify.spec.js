const { Readable } = require('stream');

const readable = require('../src/fromGenerator.js');
const toStrStream = require('../src/stringify.js');
const generate = require('../src/generator.js');
const objPopStream = require('../src/readableObjArray.js');
const assert = require('assert');


describe("Stringify feature", function() {

    let received = [];

    it("Converts arr of objects to string", function() {
        
        let sample = generate.objects( 5 );
        let expected = JSON.parse(JSON.stringify(sample));
        receiver = [];

        let rdSt = new objPopStream.stream( { objectMode: true }, sample );
        let stringifyStream = toStrStream.objectToString();

        rdSt.pipe(stringifyStream)
            .on('data', function(data) {
                received.push(JSON.parse(data));
            })  // reverse is mutable!
            .on('end', function() {
                assert.deepEqual( received.reverse(), expected );
            });
    });

    it("Check for string output", function() {

        let sample = generate.objects( 5 );
        let rdSt = new objPopStream.stream( {objectMode: true}, sample );

        let stringifyStream = toStrStream.objectToString();
        

    }
        
});