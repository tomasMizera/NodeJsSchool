const filters = require("../src/object.js");
const readable = require("../src/fromGenerator.js");
const assert = require("assert");
const generate = require( '../src/generator.js' );


describe("Object testing - functional features", function() {

    let resulted = [];
    let expected = [];

    it ("Stream map feature returns incremented", function() {
        
        let rdSt = new readable.fromGenerator( {objectMode: true}, generate.values( 5 ));
        resulted = [];

        expected = Array.from( {length: 5}, (_,i) => i + 1 );

        let mapStream = filters.map( (x) => x++ );

        rdSt.pipe(mapStream);

        mapStream.on('data', function(data) {
            resulted.push(data);
        });

        mapStream.on('end', function() {
            assert.deepEqual(resulted, expected);
        });
    });

    it ("Stream filter feature returns higher than 5", function() {
        
        let rdSt = new readable.fromGenerator( {objectMode: true}, generate.values ( 0, 5, 6, 7 ) );
        resulted = [];

        expected = Array.from( {length: 2}, (_, i) => i + 6)

        let filterStream = filters.filter((x) => x > 5 );

        rdSt.pipe(filterStream);

        filterStream.on('data', function(data) {
            resulted.push(data);
        });

        filterStream.on('end', function() {
            assert.deepEqual(resulted, expected);
        });
    });

    it ("Stream filter feature with duplicates detection returns higher than 2", function() {

        let rdSt = new readable.fromGenerator( {objectMode: true}, generate.values( 6, 2, 4, 5) );
        expected = Array.from( {length: 3}, (_, i) => i );

        let duplFiltrStream = filters.filterDuplicates( (x) => x > 2 );

        rdSt.pipe(duplFiltrStream);

        duplFiltrStream.on( 'data', function( data ) {
            resulted.push( data );
        });

        duplFiltrStream.on( 'end', function() {
            assert.deepEqual(resulted, expected);
        });
    });

    it ("2 duplicates filtering streams working", function() {

        let rdSt1 = new readable.fromGenerator( {objectMode: true}, generate.values( 6, 2, 4, 5) );
        let rdSt2 = new readable.fromGenerator( {objectMode: true}, generate.values( 6, 3, 3, 4) );
        expected = Array.from( {length: 3}, (_, i) => i );
        resulted = [];
        let resulted2 = [];

        let duplFiltrStream1 = filters.filterDuplicates( (x) => x > 2 );
        let duplFiltrStream2 = filters.filterDuplicates( (x) => x > 2 );

        rdSt1.pipe(duplFiltrStream1);
        rdSt2.pipe(duplFiltrStream2);

        duplFiltrStream1.on( 'data', function( data ) {
            resulted.push( data );
        });

        duplFiltrStream1.on( 'end', function() {
            assert.deepEqual(resulted, expected);
        });

        duplFiltrStream2.on( 'data', function(data) {
            resulted2.push( data );
        });

        duplFiltrStream2.on( 'end', function() {
            assert.deepEqual(resulted, expected);
        })
    });
});


