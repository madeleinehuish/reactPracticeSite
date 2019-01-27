if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const Deck = require('../models/deck');
const User = require('../models/user');

exports.saveDeckToDB = function(req, res, next) {

	console.log('Req.body: ', req.body);

	let email = req.body.email;
	let name = req.body.name; //deck name not user name
	let deck = req.body.deck;

	let query = {'email': email};
	// let data = {
	// 	decks: deck
	// }
	let infoToSend = {
		decks: {
			name: name,
			data: deck
		}
	}

	// { $push: { decks: deck }}

	// User.findOne({ email: email }, function(err, existingUser) {
	// 	if(err) { return next(err); }
	//
	// 	if(existingUser) {
	//
	// 	}
	// })

	User.findOneAndUpdate({ email: email },
		{ $push: infoToSend },
		{ upsert: true }, function(err, doc) {
		if(err) return res.send(500, {error: err});
		return res.send('successfully saved!!!!!')
	})
	// const user = new User(req.body);
	//
	// deck.save(function(err) {
	// 	if(err) {
	// 		return next(err);
	// 	}
	// 	res.json(deck);
	// })




	// let returnData = ':) you made it to the back end you awesome you!!!!';
	// res.send(returnData);
}
