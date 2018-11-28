const assert = require('assert');
const User = require('../../models/user');

describe('Creating records', () => {
	it('saves a user in mongo database', (done) => {
		const hermione = new User({
			firstname: 'Hermione',
			lastname: 'Granger',
		  email: 'hermione.granger@hogwarts.com',
			password: 'magicWitch999!'
		});

		hermione.save()
			.then(() => {
				assert(!hermione.isNew); //isNew is a mongo function that is true if value has NOT been saved to db
				done();
			});
	})
})
