import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/magic';

import Cardslist from './Cardslist/Cardslist';
import Creatures from './Creatures/Creatures';
import Keywords from './Keywords/Keywords';
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
				// this.props.changeCurrentCard(this.props.cards[0]);
				this.updateCards();
			});
		};

		// reset form elements
		this.inputBox.current.value = '';
		this.selectBox.current.value = 'All';
		this.colorBox.current.value = 'All';
		this.rarityBox.current.value = 'All';
		this.setBox.current.value = 'All';
		// this.setState({
		// 	inputBox: '',
		// 	selectBox: 'All',
		// 	colorBox: 'All',
		// 	rarityBox: 'All',
		// 	setBox: 'All'
		// })
		// send in default values to state
		this.props.storeFilterText('', cb);
		this.props.storeType('All', cb);
		this.props.storeCreature('All Creatures', cb);
		this.props.storeColor('All', cb);
		this.props.storeRarity('All', cb);
		this.props.storeSet('All', cb);
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
			keyword: this.props.filterKeyword
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
							<select className={styles.select} onChange={(event)=>this.handleFilter(event, 'type')} ref={this.selectBox}>
								<option default value="All">types (all)</option>
								<option value="Creature">creatures</option>
								<option value="Enchantment">enchantments</option>
								<option value="Instant">instants</option>
								<option value="Sorcery">sorceries</option>
								<option value="Planeswalker">planeswalkers</option>
								<option value="Artifact">artifacts</option>
								<option value="Land">lands</option>
							</select>
						</div>
						{this.props.filterType==='Creature' ? <div className={styles.filters}><Creatures handleFilter={this.handleFilter} /></div> : null }
						<div className={styles.filters}>
							<select className={styles.select} onChange={(event)=>this.handleFilter(event, 'colors')} ref={this.colorBox}>
								<option default value="All">colors (all)</option>
								<option value={['W']}>white</option>
								<option value={['U']}>blue</option>
								<option value={['R']}>red</option>
								<option value={['G']}>green</option>
								<option value={['B']}>black</option>
								<option value={['W', 'U']}>white / blue</option>
								<option value={['W', 'R']}>white / red</option>
								<option value={['W', 'G']}>white / green</option>
								<option value={['W', 'B']}>white / black</option>
								<option value={['U', 'R']}>blue / red</option>
								<option value={['U', 'G']}>blue / green</option>
								<option value={['U', 'B']}>blue / black</option>
								<option value={['R', 'G']}>red / green</option>
								<option value={['R', 'B']}>red / black</option>
								<option value={['G', 'B']}>green / black</option>
								<option value="Colorless">colorless</option>
							</select>
						</div>

						<div className={styles.filters}>
							<select className={styles.select} onChange={(event)=>this.handleFilter(event, 'rarity')} ref={this.rarityBox}>
								<option default value="All">rarity (all)</option>
								<option value="mythic">mythic rare</option>
								<option value="rare">rare</option>
								<option value="uncommon">uncommon</option>
								<option value="common">common</option>
							</select>
						</div>

						<div className={styles.filters}>
							<select className={styles.select} onChange={(event)=>this.handleFilter(event, 'set')} ref={this.setBox}>
								<option default value="All">sets (all)</option>
								<option value="xln">Ixalan</option>
								<option value="rix">Rivals of Ixalan</option>
								<option value="dom">Dominaria</option>
								<option value="m19">Core Set 2019</option>
								<option value="grn">Guilds of Ravnica</option>
								<option value="rna">Ravnica Allegiance</option>
							</select>
						</div>
						<div className={styles.filters}>
							<Keywords handleFilter={this.handleFilter} />
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
		testCards: state.testCards,
		authenticated: state.auth.authenticated,
		user: state.auth.user

	};
}

export default connect(mapStateToProps, actions)(Magic);
