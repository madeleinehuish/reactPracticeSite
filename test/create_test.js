const assert = require('assert');
const User = require('../models/user');

describe('Creating records', () => {
	it('saves a user', (done) => {
		const sabrina = new User({
			firstname: 'Hermione',
			lastname: 'Granger',
		  email: 'hermione.granger@hogwarts.com',
			password: 'magicWitch999!'
		});

		sabrina.save()
			.then(() => {
				assert(!sabrina.isNew); //isNew is a mongo function that is true if value has NOT been saved to db
				done();
			});
	})
})
