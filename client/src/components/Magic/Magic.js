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
	}

	// componentDidUpdate = () => {
	//
	// 	this.props.changeCurrentCard(this.props.cards[0]);
	// }

	handleHover = (cardId) => {

		let card = this.props.cards.filter(obj => {
			return obj.id === cardId;
		});

		this.props.changeCurrentCard(card[0]);

	}

	handleInput = (event) => {
		const filterValue = event.target.value;

		const cb = () => {
			this.forceUpdate(()=>{
				this.updateCards();
				this.props.changeCurrentCard(this.props.cards[0]);
			});
		};

		let type = this.props.typeSelected;
		this.props.storeFilterText(filterValue, cb);
		// this.props.getcards(filterValue, type, cb);

	}

	handleMagicButton = () => {
		//button will reset everything

		const cb = () => {
			this.forceUpdate(()=>{
				this.props.changeCurrentCard(this.props.cards[0]);
			});
		};
		let filterValue = '';
		let type = 'All';


		this.selectBox.current.value = 'All';
		this.inputBox.current.value = '';
		this.props.getcards(filterValue, type, cb);

	}

	handleSelect = (event) => {

		const cb = () => {
			let type = event.target.value;
			this.forceUpdate(()=>{
				this.props.changeCurrentCard(this.props.cards[0]);
				this.props.storeType(type);
			});

		};

		let filterValue = '';
		this.inputBox.current.value = '';
		console.log('filter length: ', filterValue.length);
		this.props.getcards(filterValue, event.target.value, cb);

	}

	updateCards = () => {
		const cb = () => {
			this.forceUpdate(()=>{
				this.props.changeCurrentCard(this.props.cards[0]);
			});
		};

		this.props.getcards(this.props.filterText, this.props.typeSelected, cb);
	}


	render() {
		console.log('this.props in Magic.js: ', this.props);
		return (
			<div>
				<br />
				<div className={styles.magicOuterContainer}>
					<h3 className={styles.title}>Magic the Gathering Cards!</h3>
					<h4>Use controls to filter cards from the Ixalan set.</h4>
					{/* <h4 className={styles.goUp}>Type into the input field to filter the results!</h4> */}
					<button id="magicButton" className={styles.button} onClick={()=>this.handleMagicButton()}>Reset</button>
					<input className={styles.input} placeholder="type to filter" onChange={(event)=>this.handleInput(event)} ref={this.inputBox}/>
					<select className={styles.select} onChange={(event)=>this.handleSelect(event)} ref={this.selectBox}>
					  <option default value="All">all</option>
					  <option value="Creature">creatures</option>
					  <option value="Enchantment">enchantments</option>
					  <option value="Instant">instants</option>
						<option value="Sorcery">sorceries</option>
						<option value="Planeswalker">planeswalkers</option>
						<option value="Artifact">artifacts</option>
						<option value="Land">lands</option>
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
	return { cards: state.cards.cards, currentCard: state.currentCard.currentCard, typeSelected: state.storeType.typeSelected, filterText: state.storeFilterText.filterText };
}

export default connect(mapStateToProps, actions)(Magic);
