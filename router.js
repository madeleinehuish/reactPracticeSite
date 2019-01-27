const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
// const magicAPI = require('./magicAPI/magicAPI');
const magicDecks = require('./magicDecks/magicDecks');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	//auth
	app.post('/signin',requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);

	// //magic cards
	// app.get('/cards', magicAPI.filterCards);

	//magic decks
	app.post('/decks', magicDecks.saveDeckToDB)

}
