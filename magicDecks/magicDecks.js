if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const User = require('../models/user');

exports.saveDeckToDB = function(req, res, next) {

	console.log('Req.body: ', req.body);

	let email = req.body.email;
	let name = req.body.deck_name; //deck name not user name
	let deck = req.body.deck;

	let query = {'email': email};

	let infoToSend = {
		decks: {
			deck_name: name,
			data: deck
		}
	}

	User.findOneAndUpdate({ email: email },
		{ $push: infoToSend },
		{ upsert: true }, function(err, doc) {
		if(err) return res.send(500, {error: err});
		return res.send('successfully saved!!!!!')
	})

}

exports.getDecksFromDB = function(req, res, next) {

	console.log('Req.body: ', req.query);
	let email = req.query.email;

	User.find({ email: email }, function(err, data) {
		if(err) return res.send(500, {error: err});
		console.log('data: ', data);
		console.log('data.decks: ', data[0].decks);
		// console.log('object keys of data', Object.keys(data));
		let decks = data[0].decks;
		return res.send(decks);
	})


}
