import data from './data/combinedData';
// import data from './data/combinedDataFullScryfall';
import firstCard from './data/firstCard';

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
