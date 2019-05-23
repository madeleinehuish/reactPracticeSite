const { signin, signup } = require('./controllers/authentication');
const passportService = require('./services/passport');
const {
	filterCards,
	filterCardsAll,
	filterCardsByBlock,
	filterCardSingle,
	filterKeywords,
	getPrice
} = require('./magicAPI/magicAPI');
const { saveDeckToDB, getDecksFromDB } = require('./magicDecks/magicDecks');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	//auth
	app.post('/signin',requireSignin, signin);
	app.post('/signup', signup);

	//magic cards
	app.get('/cards', filterCards);
	app.get('/allcards', filterCardsAll);
	app.get('/filterbyblock', filterCardsByBlock);
	app.get('/filtersinglecard', filterCardSingle);
	app.get('/filterskeyword', filterKeywords);

	//get pricing for a card
	app.get('/price', getPrice);

	//magic decks
	app.post('/decks', saveDeckToDB);
	app.get('/decks', getDecksFromDB);

}
