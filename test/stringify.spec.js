const { Readable } = require('stream');

const readable = require('../src/fromGenerator.js');
const toStrStream = require('../src/stringify.js');
const generator = require('../src/generator.js');
const assert = require('assert');


describe("stringify", function() {
    it("should convert object to string", function() {
        let collection = objGen.gen();
        let collectionCopy = JSON.parse(JSON.stringify(collection));
        let readStream = new objGen.MyReadable({ objectMode: true }, collection);
        let stringifyStream = new object.objectToString();

        readStream.pipe(stringifyStream);
        let arr = [];
        stringifyStream.on('data', function(data) {
            arr.push(JSON.parse(data));
        });
        stringifyStream.on('end', function() {
            assert.deepEqual(collectionCopy, arr.reverse());
        });
    });

    xit("should return string", function() {
        let collection = objGen.gen();
        let readStream = new objGen.MyReadable({ objectMode: true }, collection);
        let stringifyStream = new object.objectToString();

        readStream.pipe(stringifyStream);
        let arr = [];
        stringifyStream.on('data', function(data) {
            arr.push(data);
        });
        stringifyStream.on('end', function() {
           arr.forEach(function(e) {
              assert(typeof e === "string");
           });
        });
    });
});