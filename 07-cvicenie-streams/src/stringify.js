// Transforms objects to strings with JSON.stringify

const { Transform } = require('stream');

class objectsToString extends Transform {

    _transform( chunk, err, done ) {
        try {
            chunk = JSON.stringify( chunk );
        } catch ( e ) {
            return callback( e );
        }
        this.push( chunk );
        done();
    }

    constructor( options ) {
        super( options );
    }
}



module.exports = {
    objectToString: () => {
        return new objectsToString( {objectMode: true} );
    },
};
