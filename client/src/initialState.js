// import data from './data/combinedData'; // standard
import data from './data/combinedDataTest'; //mirrodin test run
// import data from './data/combinedDataFullScryfall';
// import firstCard from './data/firstCard';
import firstCard from './data/firstCardMirrodinTest';

export default {
	auth:{ //initial state
		authenticated: localStorage.getItem('token'),
		user: {
			firstname: localStorage.getItem('user_firstname'),
			lastname: localStorage.getItem('user_lastname'),
			email: localStorage.getItem('user_email')
		}
	},
	trucks: [],
	cards: {
		base: data,
		cards: data
	},
	testCards: {
		testCards: []
	},
	columnTwo: false,
	currentCard: {
		currentCard: firstCard
	},
	currentDeck: {
		name: 'Unnamed Deck',
		currentDeck: []
	},
	decks: [],
	cardFilters: {
		filterText: '',
		filterType: 'All',
		filterCreature: 'All Creatures',
		filterKeyword: 'keywords (all)',
		filterColor: 'All',
		filterRarity: 'All',
		filterSet: 'All',
		filterSpecial: 'All Special'
	}

}
