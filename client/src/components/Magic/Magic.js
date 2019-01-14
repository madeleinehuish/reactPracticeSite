import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/magic';

import Cardslist from './Cardslist/Cardslist';
import CurrentImage from './CurrentImage/CurrentImage';
// import FilterUI from './FilterUI/FilterUI'; //playing with sending the filters down but tricky with ref default updates
import EmptyWrapper from '../EmptyWrapper/EmptyWrapper';
import styles from './Magic.css';

// const CurrentImage = (props) => {
//
//
// 	if(props.currentCard.card_faces) {
// 		return (
// 			<div className={styles.flipBackground}>
// 				<div className={styles.flipCard}>
// 						<img src={ props.currentCard ? props.currentCard.card_faces[0].image_uris.large : null } className={styles.cardImage, styles.cardImageFront, styles.cardFace} alt="magic card" height="320px" />
// 						<img src={ props.currentCard ? props.currentCard.card_faces[1].image_uris.large : null } className={styles.cardImage, styles.cardImageBack, styles.cardFace} alt="magic card" height="320px" />
// 					</div>
// 				</div>
// 		)
// 	} else {
// 		return (
// 			<img src={ props.currentCard ? props.currentCard.image_uris.large : null } className={styles.cardImage} alt="magic card" height="320px" />
// 		)
// 	}
// }



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
			case 'color':
				this.props.storeColor(filterValue, cb);
				break;
			case 'rarity':
				this.props.storeRarity(filterValue, cb);
				break;
			case 'set':
				this.props.storeSet(filterValue, cb);
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
		this.props.storeColor('All', cb);
		this.props.storeRarity('All', cb);
		this.props.storeSet('All', cb);
	}

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
			color: this.props.filterColor,
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

		this.props.getcards(this.props.filterText, this.props.filterType, this.props.filterColor, this.props.filterRarity, this.props.filterSet, cb);
	}


	render() {
		console.log('this.props in Magic.js: ', this.props);
		return (
			<div>
				<br />
				<div className={styles.magicPageContainer}>
					<header><h3 className={styles.title}>Magic the Gathering Cards!</h3></header>
					<h4>Use controls to filter cards currently in Standard.</h4>
					<div className={styles.magicOuterContainer}>
						<div className={styles.outerColumn1}>
							<div className={styles.magicInnerContainer}>
								<div className={styles.col1}>
									{/* <FilterUI
										selectBoxRef={this.selectBox}

										inputBoxRef={this.inputBox}
										colorBoxRef={this.colorBox}
										rarityBoxRef={this.rarityBox}
										setBoxRef={this.selectBox}
										handleFilter={this.handleFilter}
										reset={this.reset}
									/> */}
									<div className={styles.filters}>
										<button id="magicButton" className={styles.button} onClick={()=>this.reset()}>Reset</button>
									</div>
									<div className={styles.filters}>
										<button id="testCardsButton" className={styles.button} onClick={()=>this.test()}>Test Get Cards</button>
									</div>
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
									<div className={styles.filters}>
										<select className={styles.select} onChange={(event)=>this.handleFilter(event, 'color')} ref={this.colorBox}>
										  <option default value="All">colors (all)</option>
										  <option value="W">white</option>
										  <option value="U">blue</option>
										  <option value="R">red</option>
											<option value="G">green</option>
											<option value="B">black</option>
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
										</select>
									</div>

									{/*  */}
									{/* <div className={styles.filters}>
										<select className={styles.select} onChange={(event)=>this.handleFilter(event, 'set')} ref={this.setBox}>
										  <option default value="All">sets (all)</option>
										  <option value="xln">Ixalan</option>
										  <option value="rix">Rivals of Ixalan</option>
										  <option value="dom">Dominaria</option>
											<option value="m19">Core Set 2019</option>
											<option value="grn">Guilds of Ravnica</option>
										</select>
									</div> */}

								</div>
								<div className={styles.col2}>
									<Cardslist cards={this.props.cards} handleHover={this.handleHover} currentCard={this.props.currentCard}/>
								</div>
							</div>
						</div>
						<div className={styles.outerColumn2}>
							<CurrentImage currentCard={this.props.currentCard} />
						</div>
					</div>



				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log('state in cards: ', state);
	// console.log('state.cards.cards: ', state.cards.cards);
	return {
		cards: state.cards.cards,
		currentCard: state.currentCard.currentCard,
		filterType: state.cardFilters.filterType,
		filterText: state.cardFilters.filterText,
		filterColor: state.cardFilters.filterColor,
		filterRarity: state.cardFilters.filterRarity,
		filterSet: state.cardFilters.filterSet,
		testCards: state.testCards

	};
}

export default connect(mapStateToProps, actions)(Magic);
