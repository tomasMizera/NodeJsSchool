const { Transform } = require("stream");

class uniquer {

  reset() {
    this.data = null;
  }

  check ( chunk ) {
    let parsed = JSON.stringify( chunk );
   
    if ( !this.data.has( parsed ) ) {
      this.data.add( parsed );
      return true;
    } else {
      return false;
    }
  }

  constructor() {
    this.data = new Set();
  }
}

class filterDuplicates extends Transform {

  _transform( chunk, err, done ) {

    if ( this.unq.check( chunk ) && this.fn( chunk ) ) {
      this.push( chunk );
    }

    done();
  }

  _flush() {
    this.unq.reset();
    this.unq = null;
  }  

  constructor( options, fn ) {
    super( options );
    this.unq = new uniquer();
    this.fn = fn;
  }
}


module.exports = {

  // map with Transform stream
  map: function(fn) {
    return new Transform ({
        objectMode: true,
        transform(ch, e, cb){
          this.push(fn(ch));
          cb();
        }
    });
  },

  // filter with Transform stream
  filter: function(fn) {
    return new Transform ({
        objectMode: true,
        transform(ch, e, cb){
            if (fn(ch))
                this.push(ch);
            cb();
        }
    });
  },

  // filter (without duplicates) with Transform stream
  filterDuplicates: function( fn ) {
    return new filterDuplicates( {objectMode: true}, fn );
  }
};
