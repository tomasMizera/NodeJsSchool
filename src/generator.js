function* generator( bound , ...other) {
	for( let i = 1; i <= bound; ++i) {
		yield i;
	}
	if (other.length) {
		for( let i = 0; i < other.length; ++i ) {
			yield other[i];
		}
	}
}

function objectsGenerator( bound ) {
    let objects = [];
    let c = 56;

    for( let i = 0; i < bound; ++i ) {
    	objects.push({
            r: 1,
            g: c++,
            b: 20,
            a: 55
        });
    }

    return objects;
}

