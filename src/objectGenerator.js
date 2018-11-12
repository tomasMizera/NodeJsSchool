// Readable class
// wawjs - Readable class

const {Readable} = require("stream");

// function gen() {
//     let objects = [];
//     let c = 3;
//     do {
//         objects.push({
//             r: 1,
//             a: c++
//         });
//     } while(c<10)
//     return objects;
// }


class MyReadable extends Readable {
    constructor(options, gen) {
        super(options);
        this.obj = gen;
    }

    _read() {
        let b, data;
        do {
            data = this.obj.pop();
            if (data) {
                b = this.push(data);
            } else {
                this.push(null);
                return;
            }
        }
        while (b);
    }
}

module.exports = {
    gen: gen,
    MyReadable: MyReadable
};