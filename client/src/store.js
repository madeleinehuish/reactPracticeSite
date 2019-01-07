import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

const store = createStore(
	reducers,
	{
		auth:{ //initial state
			authenticated: localStorage.getItem('token'),
			user: {
				firstname: localStorage.getItem('user_firstname'),
				lastname: localStorage.getItem('user_lastname'),
				email: localStorage.getItem('user_email')
			}
		},
		trucks: [],
		cards: [],
		currentCard: {
			currentCard: { myid: 1,
			    id: 'ccbc0aca09ec754dd5dc97081315dfdff1748132',
			    name: 'Adanto Vanguard',
			    manaCost: '{1}{W}',
			    cmc: 2,
			    colors: [ 'White' ],
			    colorIdentity: [ 'W' ],
			    type: 'Creature — Vampire Soldier',
			    types: [ 'Creature' ],
			    subtypes: [ 'Vampire', 'Soldier' ],
			    rarity: 'Uncommon',
			    set: 'XLN',
			    setName: 'Ixalan',
			    text:
			     'As long as Adanto Vanguard is attacking, it gets +2/+0.\nPay 4 life: Adanto Vanguard gains indestructible until end of turn. (Damage and effects that say "destroy" don\'t destroy it.)',
			    artist: 'Anna Steinbauer',
			    number: '1',
			    power: '1',
			    toughness: '1',
			    imageUrl:
			     'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=435152&type=card' }
		},
		filterCardByType: {
			typeSelected: 'All'
		}

	},
	applyMiddleware(reduxThunk)
);

export default store;
