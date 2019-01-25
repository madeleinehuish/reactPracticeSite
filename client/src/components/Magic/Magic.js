import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/magic';

import Cardslist from './Cardslist/Cardslist';
import Colors from './Filters/Colors/Colors';
import Creatures from './Filters/Creatures/Creatures';
import Keywords from './Filters/Keywords/Keywords';
import Rarity from './Filters/Rarity/Rarity';
import Sets from './Filters/Sets/Sets';
import Special from './Filters/Special/Special';
import Types from './Filters/Types/Types'
import CurrentImage from './CurrentImage/CurrentImage';
import styles from './Magic.css';

class Magic extends Component {

	constructor(props) {
		super(props);
		this.selectBox = React.createRef();
		this.inputBox = React.createRef();
		this.colorBox = React.createRef();
		this.rarityBox = React.createRef();
		this.setBox = React.createRef();
		this.keywordBox = React.createRef();
		this.specialBox = React.createRef();
	}

	handleFilter = (event, filterType) => {
		const filterValue = event.target.value;

		const cb = () => {
			this.forceUpdate(()=>{
				this.updateCards();
				this.props.changeCurrentCard(this.props.cards[0]);
			});
		};

		switch(filterType) {
			case 'text':
				this.props.storeFilterText(filterValue, cb);
				break;
			case 'type':
				this.props.storeType(filterValue, cb);
				break;
			case 'colors':
				this.props.storeColor(filterValue, cb);
				break;
			case 'rarity':
				this.props.storeRarity(filterValue, cb);
				break;
			case 'set':
				this.props.storeSet(filterValue, cb);
				break;
			case 'creature':
				this.props.storeCreature(filterValue, cb);
				break;
			case 'keyword':
				this.props.storeKeyword(filterValue, cb);
				break;
			case 'special':
				this.props.storeSpecial(filterValue, cb);
				break;
			default:
				break;
		}
	}

	handleHover = (cardId) => {

		let card = this.props.cards.filter(obj => {
			return obj.id === cardId;
		});

		this.props.changeCurrentCard(card[0]);
	}

	reset = () => {

		const cb = () => {
			this.forceUpdate(()=>{
				this.updateCards();
			});
		};

		// reset form elements
		this.inputBox.current.value = '';
		this.selectBox.current.value = 'All';
		this.colorBox.current.value = 'All';
		this.rarityBox.current.value = 'All';
		this.setBox.current.value = 'All';
		this.keywordBox.current.value = 'All Keywords';
		this.specialBox.current.value = 'All Special';

		// send in default values to state
		this.props.storeFilterText('', cb);
		this.props.storeType('All', cb);
		this.props.storeCreature('All Creatures', cb);
		this.props.storeColor('All', cb);
		this.props.storeRarity('All', cb);
		this.props.storeSet('All', cb);
		this.props.storeKeyword('All Keywords', cb);
		this.props.storeSpecial('All Special', cb);
	}

	//this is for testing calls to the backend to load cards from there. ulitimately going to move to this
	test = () => {
		const cb = () => {
			this.forceUpdate(()=>{
				// this.updateCards();
				console.log('TEST CALL FINISHED');
				console.log('AFTER TEST CALL PROPS: ', this.props);
			});
		};

		let filters = {
			set: this.props.filterSet,
			type: this.props.filterType,
			colors: this.props.filterColor,
			rarity: this.props.filterRarity
		}

		this.props.getCardsFromDatabase(filters, cb)
	}

	updateCards = () => {
		const cb = () => {
			this.forceUpdate(()=>{
				this.props.changeCurrentCard(this.props.cards[0]);
			});
		};

		let filters = {
			set: this.props.filterSet,
			type: this.props.filterType,
			text: this.props.filterText,
			color: this.props.filterColor,
			rarity: this.props.filterRarity,
			creature: this.props.filterCreature,
			keyword: this.props.filterKeyword,
			special: this.props.filterSpecial
		}

		this.props.getcards(filters, cb);
	}

	render() {
		console.log('this.props in Magic.js: ', this.props);
		if (this.props.authenticated) {
		return (
			<div>
				<br />
				<div className={styles.magicPageContainer}>
					<header className={styles.control_bar}>
						<div className={styles.title}>Filters</div>
						<div className={styles.filters}>
							<button id="magicButton" className={styles.button} onClick={()=>this.reset()}>Reset</button>
						</div>
						{/* dont get rid of the following!!!! */}
						{/* <div className={styles.filters}>
							<button id="testCardsButton" className={styles.button} onClick={()=>this.test()}>Test Get Cards</button>
						</div> */}
						<div className={styles.filters}>
							<input className={styles.input} placeholder="type to filter" onChange={(event)=>this.handleFilter(event, 'text')} ref={this.inputBox}/>
						</div>
						<div className={styles.filters}>
							<Types handleFilter={this.handleFilter} ref={this.selectBox}/>
						</div>
						{this.props.filterType==='Creature' ? <div className={styles.filters}><Creatures handleFilter={this.handleFilter} /></div> : null }
						<div className={styles.filters}>
							<Colors handleFilter={this.handleFilter} ref={this.colorBox}/>
						</div>
						<div className={styles.filters}>
							<Rarity handleFilter={this.handleFilter} ref={this.rarityBox} />
						</div>
						<div className={styles.filters}>
							<Sets handleFilter={this.handleFilter} ref={this.setBox} />
						</div>
						<div className={styles.filters}>
							<Keywords handleFilter={this.handleFilter} ref={this.keywordBox}/>
						</div>
						<div className={styles.filters}>
							<Special handleFilter={this.handleFilter} ref={this.specialBox}/>
						</div>
					</header>

					<div className={styles.magicOuterContainer}>
						<div className={styles.col}>
							<CurrentImage currentCard={this.props.currentCard} />
						</div>
						<div className={[styles.col, styles.col2].join(' ')}>
							<Cardslist cards={this.props.cards} handleHover={this.handleHover} currentCard={this.props.currentCard}/>
						</div>
						<div className={[styles.col, styles.col3].join(' ')}>
							<div className={styles.deckBuilding}>DeckBuilding Goes here</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return <div>You need to be signed in to see this page!</div>
	}
	}
}

function mapStateToProps(state) {
	console.log('state in cards: ', state);
	// console.log('state.cards.cards: ', state.cards.cards);
	return {
		cards: state.cards.cards,
		currentCard: state.currentCard.currentCard,
		filterType: state.cardFilters.filterType,
		filterCreature: state.cardFilters.filterCreature,
		filterKeyword: state.cardFilters.filterKeyword,
		filterText: state.cardFilters.filterText,
		filterColor: state.cardFilters.filterColor,
		filterRarity: state.cardFilters.filterRarity,
		filterSet: state.cardFilters.filterSet,
		filterSpecial: state.cardFilters.filterSpecial,
		testCards: state.testCards,
		authenticated: state.auth.authenticated,
		user: state.auth.user

	};
}

export default connect(mapStateToProps, actions)(Magic);
