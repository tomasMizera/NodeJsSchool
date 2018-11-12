// Transforms objects to strings with JSON.stringify

const { Transform } = require('stream');

const objectToString = function() {
    return new Transform({
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            try {
                chunk = JSON.stringify(chunk);
            } catch (e) {
                return callback(e);
            }
            this.push(chunk);
            callback();
        },
    });
};

module.exports = {
    objectToString: objectToString,
};
