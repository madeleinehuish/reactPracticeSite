import React, { Component } from 'react';
import styles from './DeckBuilding.css';
import EmptyWrapper from '../../EmptyWrapper/EmptyWrapper';

const Multiples = (props) => {
	let multiplesArr=[];
	// let multiplesArr = [<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } key='1' onClick={()=>props.deckModify(props.card, 'delete')} onMouseOver={()=>{props.handleHover(props.card.info)}} style={{ position: 'absolute', zIndex: i, marginTop: `${margin}px`, marginLeft: `${margin}px`}} className={styles.cardImage} alt="magic card" height="100px" />];
	for(let i = 1; i <= props.card.number; i++){
		let margin;
		if(i > 1) {
			margin=5*(i-1);
		} else margin=0;

		multiplesArr.push(
			<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } key={i} onClick={()=>props.deckModify(props.card, 'delete')} onMouseOver={()=>{props.handleHover(props.card.info)}} style={{ position: 'absolute', zIndex: i, top: `${margin}px`, left: `${margin}px`}} className={styles.cardImage} alt="magic card" height="100px" />
		)
	}

	return (
		<EmptyWrapper>
			<div className={styles.cardDiv}>
				<div className={styles.relativeDiv}>
					{multiplesArr}
				</div>
			</div>
		</EmptyWrapper>
	)
}

class DeckBuilding extends Component {

	state = {
		inputValue: ''
	}

	handleInput = (event) => {
		this.setState({ inputValue: event.target.value})
	}

	render() {
	return (
		<EmptyWrapper>
			<header className={styles.controlBar}>
				<div className={styles.titleWrapper}>
					<b className={styles.title}>{this.props.deckName}</b>
				</div>

				<div className={styles.filters}>
					<form onSubmit={(event)=> this.props.handleDeckNameSubmit(event, this.state.inputValue)}>
						<input className={styles.input} value={this.state.inputValue} onChange={this.handleInput} type='text' placeholder='change deck name'></input>
					</form>
				</div>
				<div className={styles.filters}>
					<select className={styles.select}>
						<option>decks</option>
					</select>
				</div>
				<div className={styles.filters}>
					<button className={styles.button}>Save</button>
				</div>
				<div className={styles.filters}>
					<button className={styles.button}>Analysis</button>
				</div>
				<div className={styles.filters}>
					<button className={styles.button}>Reset</button>
				</div>
			</header>
			<div className={styles.deckWrapper}>
				<div className={styles.deckGrid}>
					{this.props.deck.map((card, index) => {
						if(card.number>1) {
							return <Multiples key={index} card={card} handleHover={this.props.handleHover} deckModify={this.props.deckModify}/>
						} else {
							return (
								<div className={styles.cardDiv} key={index}>
									<img src={ card.info.image_uris ? card.info.image_uris.small : null } onClick={()=>this.props.deckModify(card, 'delete')} onMouseOver={()=>{this.props.handleHover(card.info)}} className={styles.cardImage} alt="magic card" height="100px" />
								</div>
							)
						}
					})}
				</div>
			</div>
		</EmptyWrapper>
	)};
}

export default DeckBuilding;
