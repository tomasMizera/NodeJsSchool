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

module.exports = {
	values: generator,
};