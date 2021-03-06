import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions/magic';
// import getUrl from '../../actions/development';

import CurrentImage from './CurrentImage/CurrentImage';
import Cardslist from './Cardslist/Cardslist';
import CurrentSelected from './Cardslist/CurrentSelected';
import CurrentCardInfo from './Cardslist/CurrentCardInfo';
import { STANDARD_BLOCK_CURRENT } from '../../config';

import DeckBuilding from './DeckBuilding/DeckBuilding';

import Colors from './Filters/Colors';
import Creatures from './Filters/Creatures';
import CreaturesForFull from './Filters/CreaturesForFull'
import Keywords from './Filters/Keywords';
import KeywordsForFull from './Filters/KeywordsForFull';
import Rarity from './Filters/Rarity';
// import Sets from './Filters/Sets';
import SetsStandard from './Filters/SetsStandard';
import StandardBlocks from './Filters/Blocks';
import SetsAll from './Filters/SetsAll';

import Special from './Filters/Special';
import Types from './Filters/Types';
import Cmc from './Filters/CMC';

import styles from './Magic.css';


//TODO move SearchForm to another file
class SearchForm extends Component {
	state = {
		searchTerm: ''
	};

	handleSearch = (event) => {
		this.setState({
			searchTerm: event.target.value
		});
	};

	render() {
		return (
			<form onSubmit={(event) => this.props.getSingleTerm(event, this.state.searchTerm || 'no term')}>
				<div className={styles.filters}>
					<input className={[styles.input, styles.inputSearch].join(' ')} placeholder="   ...search for card" onChange={this.handleSearch} value={this.state.searchTerm}/>
				</div>
				<div className={styles.filters}>
					<button id="searchButton" className={styles.button} type="submit">Search</button>
				</div>
			</form>
		)
	}
}

class Magic extends Component {

	constructor(props) {
		super(props);
		//filter refs
		this.standardBlocks = React.createRef();
		this.selectBox = React.createRef();
		this.inputBox = React.createRef();
		this.colorBox = React.createRef();
		this.rarityBox = React.createRef();
		this.setBox = React.createRef();
		this.keywordBox = React.createRef();
		this.keywordFullBox = React.createRef();
		this.creatureFullBox = React.createRef();
		this.specialBox = React.createRef();
		this.standardSetBox = React.createRef();
		this.cmcBox = React.createRef();

		// //deckbuilding refs
		// this.selectDeck = React.createRef();
		// this.inputDeck = React.createRef();
	}

	state = {
		numberOfExtraPriceCalls: 0
	}

	componentDidMount() {

		const cb = () => {
			console.log('component did mount complete')
		}
			console.log('call to price component did mount')
			this.props.getCurrentPrice(this.props.currentCard, cb);

	}

	componentDidUpdate(prevProps) {
		// console.log('componentDidUpdate', prevProps)
		const cb = () => {
			// console.log('component did update finished...')
		}
		const { currentCard } = this.props;
		console.log('componentDidUpdate')
		if(prevProps.currentCardIsFlipped) {
			this.flipCurrentCard(true);
		}
		// if(prevProps.currentPrice===0) {
		// 	console.log('call to price component did update');
		// 	this.props.getCurrentPrice(card, cb);
		// }
		if(prevProps.currentCard !== currentCard) {
			this.props.getCurrentPrice(currentCard, cb);
		}
	}


	getSingleTerm = (event, term) => {
		const cb = () => {
			// event.preventDefault();
			let cb2 = () => { };
			this.forceUpdate(()=>{
				this.props.changeCurrentCard(this.props.cards[0]);
				this.props.getCurrentPrice(this.props.cards[0], cb2);
			});
		};
		event.preventDefault();
		this.props.getSingle(term, cb);
		// console.log('%%%%%%%%%%%%%%%%%%term : ', term);
	}

	// handleDeckNameSubmit = (event, value) => {
	//
	// 	const cb = () => {
	// 		event.preventDefault();
	//
	// 		this.forceUpdate(()=>{
	// 		});
	// 	};
	// 	this.props.storeDeckName(value, cb)
	// }

	addToDeck = (card) => {

		let deck = this.props.currentDeck;
		if(card && card.name==="There are no cards with these given filters") return;

		this.props.addToCurrentDeck(card, deck);
	};
	//
	// saveDeck = () => {
	// 	this.props.saveDeckToDB({
	// 		deck_name: this.props.currentDeckName,
	// 		deck: this.props.currentDeck
	// 	})
	// }

	flipCurrentCard = (defaultFlip) => {
		if(defaultFlip) {
			this.props.flipCurrentCardAction(false); //this will reset the card
		} else {
			this.props.flipCurrentCardAction(!this.props.currentCardIsFlipped); //toggle
		}
	}

	handleClickColumnTwo = () => {
		this.props.setColumnTwo(this.props.columnTwo);
	}

	handleFilter = (event, filterType) => {
		const filterValue = event.target.value;
		// console.log('filterValue: ', filterValue);
		let cb2a = () => { };
		const cb = () => {
			this.forceUpdate(()=>{

				this.updateCards(false);
				console.log('handle filter')
				this.props.changeCurrentCard(this.props.cards[0]);
				this.props.getCurrentPrice(this.props.cards[0], cb2a);

			});
		};

		const cb2 = () => {
			// console.log('cb2, no forceUpdate')
			this.props.changeCurrentCard(this.props.cards[0]);
			this.props.getCurrentPrice(this.props.cards[0], cb2a);
			// this.forceUpdate(()=>{
			// 	this.props.changeCurrentCard(this.props.cards[0]);
			// });
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
			case 'cmc':
				this.props.storeCMC(filterValue, cb);
				break;
			case 'set':

				let filters = {
					set: event.target.value,
					type: 'All',
					colors: 'All',
					rarity: 'All'
				}

				if(filters.set==='All') {
					// console.log('hit filters.set==="all"')
					this.props.updateBlock(this.props.currentBlock.name, cb2);
					return;
				}
				else {
					console.log('hit getCardsFromDatabase', filters)
					this.props.getCardsFromDatabase(filters, cb2);
					return;
				}
				// break;
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

	handleFilterKeywordFull = event => {
		const filterValue = event.target.value;
		// console.log('inside handleFilterKeywordFull, filterValue: ', filterValue);
		const cb = () => {
			this.forceUpdate(()=>{
				this.updateCards(false);
			});
		};
		this.props.getKeywordsFromDatabase(filterValue, cb);
	}

	handleFilterCreatureFull = event => {
		const filterValue = event.target.value;

		const cb = () => {
			this.forceUpdate(()=>{
				this.updateCards(false)
			});
		};
		this.props.getCreaturesFromDatabase(filterValue, cb);
	}

	handleHover = cardId => {
		let card = this.props.cards.find(obj => obj.id === cardId);
		this.props.changeCurrentCard(card);
	}

	handleDeckHover = card => {
		this.props.setColumnTwo(false);
		this.props.changeCurrentCard(card);
	}

	handleNewBlock = event => {
		const cb = () => {
			let cb2 = () => { };
			this.props.changeCurrentCard(this.props.cards[0]);
			this.props.getCurrentPrice(this.props.cards[0], cb2);
			// this.forceUpdate(()=>{
			// 	this.props.changeCurrentCard(this.props.cards[0]);
			// });
		};
		// console.log('new block event : ', event.target.value)
		this.props.updateBlock(event.target.value, cb);
		// this.props.changeCurrentCard(this.props.cards[0]);
	}

	reset = fullReset => {
		const cb = () => {
			if(fullReset) {
				this.forceUpdate(()=>{
					this.setState({ columnTwo: false });
					this.updateCards(true);
				});
			} else {
				this.forceUpdate(()=>{
					this.setState({ columnTwo: false });
					this.updateCards(false);
				});
			}

		};

		// reset form elements
		this.inputBox.current.value = '';
		this.selectBox.current.value = 'All';
		this.colorBox.current.value = 'All';
		this.rarityBox.current.value = 'All';
		this.setBox.current.value = 'All';
		this.standardSetBox.current.value = 'All';
		this.keywordBox.current.value = 'keywords (all)';
		this.keywordFullBox.current.value = 'keywords (all)';
		this.creatureFullBox.current.value = 'All Creatures';
		this.specialBox.current.value = 'All Special';
		this.cmcBox.current.value = 'All CMC';
		if(fullReset) {
			this.standardBlocks.current.value = STANDARD_BLOCK_CURRENT;  //TODO: add to config, add ref
			// this.standardBlocks.current.value = 'Oct 19 to Jan 20';  //TODO: add to config, add ref
		}

		// send in default values to state
		this.props.storeFilterText('', cb);
		this.props.storeType('All', cb);
		this.props.storeCreature('All Creatures', cb);
		this.props.storeColor('All', cb);
		this.props.storeRarity('All', cb);
		this.props.storeSet('All', cb);
		this.props.storeKeyword('keywords (all)', cb);
		this.props.storeSpecial('All Special', cb);
		this.props.storeCMC('All CMC', cb);

		if(fullReset) {
			this.props.resetBlock(this.props.currentStandard, cb); //standard in present time
		} else {
			this.props.resetBlock(this.props.currentBlock, cb); //standard block as filtered
		}

	}

	updateCards = (reset) => {
		// console.log('updateCards')
		const cb = () => {

			this.forceUpdate(()=>{
				let cb2 = () => { };
				console.log('update cards cb')
				this.props.changeCurrentCard(this.props.cards[0]);
				this.props.getCurrentPrice(this.props.cards[0], cb2);

			});
		};

		let filters = {
			// set: this.props.filterSet,
			type: this.props.filterType,
			text: this.props.filterText,
			color: this.props.filterColor,
			rarity: this.props.filterRarity,
			creature: this.props.filterCreature,
			keyword: this.props.filterKeyword,
			special: this.props.filterSpecial,
			cmc: this.props.filterCMC
		}

		if(!reset) {
			// console.log('first in updatecards, reset===', reset);
			this.props.getcards(this.props.base, filters, false, cb);
		} else {
			// console.log('second in updatecards, reset===', reset);
			this.props.getcards(this.props.standard, filters, true, cb);
		}

	}

	render() {
		// console.log('this.props in Magic.js: ', this.props);
		// console.log('render triggered');

		if (this.props.authenticated) {
		return (
			<div>
				<div className={styles.break}/>
				<div className={styles.magicPageContainer}>

					<div className={styles.topHeaderContainer}>
						<div className={styles.topHeaderColumns}>
							<div className={styles.control_bar}>
								<SearchForm getSingleTerm={this.getSingleTerm}/>
							</div>
						</div>

						<div className={styles.topHeaderColumns}>
							<div className={styles.control_bar}>

								<div className={styles.filters}>
									<StandardBlocks handleNewBlock={this.handleNewBlock} currentBlock={this.props.currentBlock} ref={this.standardBlocks}/>
								</div>
								<div className={styles.filters}>
									{
										this.props.filterSet==='All' ?
											<SetsStandard handleFilter={this.handleFilter} currentBlock={this.props.currentBlock} ref={this.standardSetBox} /> :
											null
									}
								</div>
								<div className={styles.filters}>
									<SetsAll handleFilter={this.handleFilter} ref={this.setBox} />
								</div>
								<div className={styles.filters}>
									<KeywordsForFull handleFilterKeywordFull={this.handleFilterKeywordFull} ref={this.keywordFullBox} />
								</div>
								<div className={styles.filters}>
									<CreaturesForFull handleFilter={this.handleFilter} handleFilterCreatureFull={this.handleFilterCreatureFull} ref={this.creatureFullBox}/>
								</div>
								{/* <div className={styles.control_bar}> */}

								{/* </div> */}
							</div>
						</div>
					</div>

					<div className={styles.bottomHeaderContainer}>
							{/* <div className={styles.bottomHeaderColumns}> */}
								{/* <div className={styles.control_bar}>
									<div className={styles.filters}>
										<button id="magicButton" className={styles.button} onClick={()=>this.reset(true)}>Reset</button>
									</div>
								</div> */}
							{/* </div> */}
							<div className={styles.bottomHeaderColumns}>
								<div className={styles.control_bar}>
									<div className={styles.filters}>
										<input className={[styles.input, styles.inputFilter].join(' ')} placeholder="  ...filter current list" onChange={(event)=>this.handleFilter(event, 'text')} ref={this.inputBox}/>
									</div>
								</div>
							</div>
							<div className={styles.bottomHeaderColumns}>
								<div className={styles.control_bar}>
									<div className={styles.topFilters}>
										<div className={styles.filters}>
											<button id="magicButton" className={styles.button} onClick={()=>this.reset(true)}>Reset</button>
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
											<Keywords handleFilter={this.handleFilter} ref={this.keywordBox}/>
										</div>
										<div className={styles.filters}>
											<Special handleFilter={this.handleFilter} ref={this.specialBox}/>
										</div>
										<div className={styles.filters}>
											<Cmc handleFilter={this.handleFilter} ref={this.cmcBox}/>
										</div>
									</div>
								</div>
							</div>
					</div>


					<div className={styles.magicOuterContainer}>

						<div className={styles.col}>
							<CurrentImage currentCard={this.props.currentCard} flipped={this.props.currentCardIsFlipped} flipCurrentCard={this.flipCurrentCard}/>
						</div>

						<div className={[styles.col, styles.col2].join(' ')}>
							<CurrentSelected currentSelected={this.props.currentCard} currentPrice={this.props.currentPrice} addToDeck={this.addToDeck} currentDeck={this.props.currentDeck}/>
							<br />
							{this.props.columnTwo
								? <CurrentCardInfo card={this.props.currentCard} handleClick={this.handleClickColumnTwo} /> :
									<Cardslist cards={this.props.cards} handleHover={this.handleHover} handleClick={this.handleClickColumnTwo} currentCard={this.props.currentCard}/>
							}
						</div>

						<div className={[styles.col, styles.col3].join(' ')}>
							<DeckBuilding
								handleHover={this.handleDeckHover}

								deck={this.props.currentDeck}
								decks={this.props.decks}
								deckName={this.props.currentDeckName}
								// saveDeck={this.saveDeck}
								handleDeckNameSubmit={this.handleDeckNameSubmit}
								deckModify={this.deckModify}
								// ref={{ refSelect: this.selectDeck, refInput: this.inputDeck }}
								// resetDeck={this.resetDeck}
							/>
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
	// console.log('state.cards.length: ', state.cards.length)
	// console.log('state in magic: ', state);
	console.log('state.cards.cards.length: ', state.cards.cards.length);
	return {
		base: state.cards.base,
		cards: state.cards.cards,
		standard: state.cards.standard,
		columnTwo: state.columnTwo.columnTwo,
		currentBlock: state.currentBlock, //double check
		currentStandard: state.currentStandard,
		currentCard: state.currentCard.currentCard,
		currentPrice: state.currentCard.currentPrice,
		currentCardIsFlipped: state.currentCard.flipped,
		currentDeckName: state.currentDeck.deck_name,
		decks: state.decks.decks,
		currentDeck: state.currentDeck.deck,
		filterType: state.cardFilters.filterType,
		filterCreature: state.cardFilters.filterCreature,
		filterKeyword: state.cardFilters.filterKeyword,
		filterText: state.cardFilters.filterText,
		filterColor: state.cardFilters.filterColor,
		filterCMC: state.cardFilters.filterCMC,
		filterRarity: state.cardFilters.filterRarity,
		filterSet: state.cardFilters.filterSet,
		filterSpecial: state.cardFilters.filterSpecial,
		testCards: state.testCards,
		authenticated: state.auth.authenticated,
		user: state.auth.user
	};
}

export default connect(mapStateToProps, actions)(Magic);


//this is for testing calls to the backend to load cards from there. ultimately going to move to this
// test = (config) => {
// 	const cb = () => {
// 		this.forceUpdate(()=>{
// 			this.updateCards();
// 			console.log('TEST CALL FINISHED');
// 			console.log('AFTER TEST CALL PROPS: ', this.props);
// 		});
// 	};
//
// 	let filters = {
// 		// set: config.set,
// 		type: 'All',
// 		colors: 'All',
// 		rarity: 'All'
// 		// type: this.props.filterType,
// 		// colors: this.props.filterColor,
// 		// rarity: this.props.filterRarity
// 	}
//
// 	// DON'T REMOVE!
// 	this.props.getAllCardsFromDatabase(filters, cb)
// }
