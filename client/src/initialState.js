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
	currentCard: {
		currentCard: firstCard
	},
	// currentDeck: {
	// 	currentDeck: []
	// },
	currentDeck: {
		currentDeck: []
	},
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
