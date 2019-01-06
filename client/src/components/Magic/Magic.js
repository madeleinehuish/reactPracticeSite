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

	render() {
		console.log('this.props.cards in Magic.js: ', this.props.cards);
		return (
			<div>
				<br />
				<div className={styles.magicContainer}>
					<h3 className={styles.title}>Magic the Gathering Cards!</h3>
					<h4>Push button to get list of cards from the Ixalan Set.</h4>
					{/* <h4 className={styles.goUp}>Type into the input field to filter the results!</h4> */}
					<button id="magicButton" className={styles.button} onClick={()=>this.handleMagicButton()}>Get Cards</button>
					{/* <input className={styles.input} onChange={(event)=>this.handleInput(event)}/> */}
					<div >
						<Cardslist cards={this.props.cards} />
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log('state in cards: ', state);
	console.log('state.cards.cards: ', state.cards.cards);
	return { cards: state.cards.cards };
}

export default connect(mapStateToProps, actions)(Magic);
