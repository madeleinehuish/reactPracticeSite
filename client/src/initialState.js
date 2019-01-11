import data from './data/combinedData';
const firstCard = data[0];


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
	currentCard: {
		currentCard: firstCard
	},
	cardFilters: {
		filterText: '',
		filterType: 'All',
		filterColor: 'All',
		filterRarity: 'All',
		filterSet: 'All'
	}

}
