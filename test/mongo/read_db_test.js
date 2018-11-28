// const assert = require('assert');
// const User = require('../../models/user');
// const colors = require('colors');
//
// describe('Reading users out of the database', () => {
// 	let hermione;
//
// 	beforeEach((done) => {
// 		hermione = new User({
// 			firstname: 'Hermione',
// 			lastname: 'Granger',
// 		  email: 'hermione.granger@hogwarts.com',
// 			password: 'magicWitch999!'
// 		});
//
// 		hermione.save()
// 			.then(() => done());
// 	})
//
// 	it('finds all users with name of Hermione', (done) => {
// 		User.find({ firstname: 'Hermione'})
// 			.then((users) => {
// 				console.log('users: ', users);
// 				assert(users[0]._id.toString() === hermione._id.toString());
//
// 				// :)
// 				console.log(' ');
// 				console.log('  You fucking rock Madeleine!!!! :)'.magenta)
// 				done();
// 			})
// 	})
//
// 	it('find a user with a particular id', (done) => {
// 		User.findOne({ _id: hermione._id })
// 			.then((user) => {
// 				assert(user.name === 'Hermione');
// 				done();
// 			});
// 	})
// })
