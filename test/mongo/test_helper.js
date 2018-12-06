const mongoose = require('mongoose');

before((done) => {
	mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
	mongoose.connection
		.once('open', () => {
			done();
		})
		.on('error', (error) => {
			console.warn('Warning', error);
			done();
		});
})

beforeEach((done) => {
		console.log('inside of helper'.yellow);
		mongoose.connection.collections.users.drop(() => {
		done();
	});
})
