const { Readable } = require('stream');

function* generator(limit) {
    for (let i = 1; i < limit; i++) {
        yield i;
    }
}

class FromGenerator extends Readable {
    _read() {
        let b, data;
        do {
            data = this.resource.next();
            if ( !data.done ) {
                let dataChunk = data.value;
                b = this.push( dataChunk );
            } else {

                this.push( null );
                return;
            }
        }
        while ( b );
    }
    constructor(options, generator) {
        super( options );
        this.resource = generator;
    }
}


module.exports = {
    fromGenerator: FromGenerator,
    generator: generator,
};
