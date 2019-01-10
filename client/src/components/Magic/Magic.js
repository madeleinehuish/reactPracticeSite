import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Cardslist from './Cardslist/Cardslist';
import styles from './Magic.css';

class Magic extends Component {

	constructor(props) {
		super(props);
		this.selectBox = React.createRef();
		this.inputBox = React.createRef();
		this.colorBox = React.createRef();
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
				this.props.changeCurrentCard(this.props.cards[0]);
				this.updateCards();
			});
		};

		this.inputBox.current.value = '';
		this.selectBox.current.value = 'All';
		this.colorBox.current.value = 'All';
		//send in default values
		this.props.storeFilterText('', cb);
		this.props.storeType('All', cb);
		this.props.storeColor('All', cb);
	}

	updateCards = () => {
		const cb = () => {
			this.forceUpdate(()=>{
				this.props.changeCurrentCard(this.props.cards[0]);
			});
		};

		this.props.getcards(this.props.filterText, this.props.filterType, this.props.filterColor, cb);
	}


	render() {
		console.log('this.props in Magic.js: ', this.props);
		return (
			<div>
				<br />
				<div className={styles.magicOuterContainer}>
					<h3 className={styles.title}>Magic the Gathering Cards!</h3>
					<h4>Use controls to filter cards from the Ixalan set.</h4>
					<button id="magicButton" className={styles.button} onClick={()=>this.reset()} >Reset
					</button>
					<input className={styles.input} placeholder="type to filter" onChange={(event)=>this.handleFilter(event, 'text')} ref={this.inputBox}/>
					<select className={styles.select} onChange={(event)=>this.handleFilter(event, 'type')} ref={this.selectBox}>
					  <option default value="All">all</option>
					  <option value="Creature">creatures</option>
					  <option value="Enchantment">enchantments</option>
					  <option value="Instant">instants</option>
						<option value="Sorcery">sorceries</option>
						<option value="Planeswalker">planeswalkers</option>
						<option value="Artifact">artifacts</option>
						<option value="Land">lands</option>
					</select>

					<select className={styles.select} onChange={(event)=>this.handleFilter(event, 'color')} ref={this.colorBox}>
					  <option default value="All">all</option>
					  <option value="W">white</option>
					  <option value="U">blue</option>
					  <option value="R">red</option>
						<option value="G">green</option>
						<option value="B">black</option>
						<option value="Colorless">colorless</option>
					</select>

					<div className={styles.magicGridContainer}>
						<div className={styles.col1}>
							<Cardslist cards={this.props.cards} handleHover={this.handleHover} currentCard={this.props.currentCard}/>
						</div>
						<div className={styles.col2}>
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
		filterColor: state.cardFilters.filterColor
	};
}

export default connect(mapStateToProps, actions)(Magic);
