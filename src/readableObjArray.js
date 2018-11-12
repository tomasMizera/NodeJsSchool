const {Readable} = require("stream");

// Custom readable stream for poping objects out of array

class objectsPopStream extends Readable {

    constructor( options, objects ) {
        super( options );
        this.objArr = objects;
    }

    _read() {
        let b, data;
        do {
            data = this.objArr.pop();
            
            if (data) {
                b = this.push(data);
            } else {
                this.push(null);
                return;
            }
        } while (b);
    }
}

module.exports = {
    stream: objectsPopStream,
};