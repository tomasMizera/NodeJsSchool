const re = require('../src/fromGenerator.js');
const assert = require('assert');
const { Readable } = require('stream');

describe('readable stream', function() {
    let collection = re.generator(10);
    let readStream = new re.fromGenerator({ objectMode: true }, collection);
    let counter = 1;

    it('should be instance of Readable', function() {
        assert(readStream instanceof Readable);
    });

    it('should iterate number properly', function() {
        readStream.on('data', function(data) {
            assert(data === counter);
            counter++;
        });
    });

    it('should check returned numbers', function() {
        let arr = [];
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        numbers = numbers.map(a => a.toString() + '\n');

        let collection = re.generator(10);
        let readStream1 = new re.fromGenerator({ objectMode: true }, collection);

        readStream1.on('data', function(data) {
            arr.push(data);
        });

        readStream1.on('end', function() {
            assert.deepEqual(arr, numbers);
        });
    });
});
