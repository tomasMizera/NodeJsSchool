const re = require("./fromGenerator.js");

const object = require("./objectGenerator.js");
const map = require("./object.js");

const stringify = require("./stringify.js");
const stream = require("stream");

var objects = object.gen();

var n = new object.MyReadable({objectMode: true}, objects);

var matka = stringify.objectToString();

n.pipe(matka).pipe(process.stdout);

var collection = re.generator(1000);

var m = new re.fromGenerator({objectMode: true},collection);

var str = new stream.Writable();

str._write = function(ch, en, done) {
  console.log(ch);
  done();
};


//m.pipe(matka).pipe(process.stdout);

//m.pipe(str);
str.on('data', function(ch){
  console.log(ch.data.value.toString);
});



