import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Cardslist from './Cardslist/Cardslist';
import styles from './Magic.css';

class Magic extends Component {

	// handleInput = (event) => {
	// 	const filterValue = event.target.value;
	// 	// console.log(event.target.value);
	//
	// 	const cb = () => {
	// 		this.forceUpdate();
	// 	};
	//
	// 	this.props.getcards(filterValue, cb);
	// }
	//
	handleMagicButton = () => {
		const cb = () => {
			this.forceUpdate();
		};
		// console.log('placeholder')
		this.props.getcards(cb);
	}

	handleHover = (cardId) => {
		console.log('this.props in Magic.js: ', this.props);
		console.log('hovering works! card id is : ', cardId);
		let card = this.props.cards.filter(obj => {
			return obj.id === cardId;
		});
		console.log('card: ', card[0]);
		console.log('the image Url for this card is : ', card[0].imageUrl);
		this.props.changeCurrentCard(card[0]);

	}

	render() {
		console.log('this.props.currentCard in Magic.js: ', this.props.currentCard);
		return (
			<div>
				<br />
				<div className={styles.magicOuterContainer}>
					<h3 className={styles.title}>Magic the Gathering Cards!</h3>
					<h4>Push button to get list of cards from the Ixalan Set.</h4>
					{/* <h4 className={styles.goUp}>Type into the input field to filter the results!</h4> */}
					<button id="magicButton" className={styles.button} onClick={()=>this.handleMagicButton()}>Get Cards</button>
					{/* <input className={styles.input} onChange={(event)=>this.handleInput(event)}/> */}
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
	return { cards: state.cards.cards, currentCard: state.currentCard.currentCard };
}

export default connect(mapStateToProps, actions)(Magic);
