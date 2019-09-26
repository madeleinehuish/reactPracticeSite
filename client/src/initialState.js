import data from './data/combinedData'; // current standard
// import data from './data/combinedDataTest'; //mirrodin test run
import firstCard from './data/firstCard';
// import firstCard from './data/firstCardMirrodinTest';

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
		standard: data,
		base: data,
		cards: data
	},
	testCards: {
		testCards: []
	},
	columnTwo: false,
	currentCard: {
		currentCard: firstCard,
		flipped: false,
		currentPrice: 0
	},
	currentDeck: {
		deck_name: 'new deck',
		deck: []
	},
	currentStandard: { //current standard block as of present time
		name: 'Oct 19 to Jan 20',
		sets: [ 'Guilds_of_Ravnica', 'Ravnica_Allegiance', 'War_of_the_Spark', 'Core_Set_2020', 'Throne_of_Eldraine']
	},
	currentBlock: { //currently selected standard block
		name: 'Oct 19 to Jan 20',
		sets: [ 'Guilds_of_Ravnica', 'Ravnica_Allegiance', 'War_of_the_Spark', 'Core_Set_2020', 'Throne_of_Eldraine']
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
		filterSpecial: 'All Special',
		filterCMC: 'All CMC'
	}

}
