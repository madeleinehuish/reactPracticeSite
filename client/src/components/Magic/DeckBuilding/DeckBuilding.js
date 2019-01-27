import React from 'react';
import styles from './DeckBuilding.css';
import EmptyWrapper from '../../EmptyWrapper/EmptyWrapper';

const Multiples = (props) => {

	let multiplesArr = [<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } key='1' onClick={()=>props.deckModify(props.card, 'delete')} onMouseOver={()=>{props.handleHover(props.card.info)}} style={{ position: 'relative' }} className={styles.cardImage} alt="magic card" height="100px" />];
	for(let i = 2; i <= props.card.number; i++){
		let margin=5*(i-1);

		multiplesArr.push(<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } key={i} onClick={()=>props.deckModify(props.card, 'delete')} onMouseOver={()=>{props.handleHover(props.card.info)}} style={{ position: 'absolute', zIndex: i, marginTop: `${margin}px`, marginLeft: `${margin}px`}} className={styles.cardImage} alt="magic card" height="100px" />)
	}

	return (
		<EmptyWrapper>
			<div className={styles.cardDiv} >
				{multiplesArr}
			</div>
		</EmptyWrapper>
	)
}

const DeckBuilding = (props) => {
	return (
		<div className={styles.deckWrapper}>
			<b className={styles.title}>Current Deck (this part still in progress)</b>
			<div className={styles.deckGrid}>
				{props.deck.map((card, index) => {
					if(card.number>1) {
						return <Multiples key={index} card={card} handleHover={props.handleHover} deckModify={props.deckModify}/>
					} else {
						return (
							<div className={styles.cardDiv} key={index}>
								<img src={ card.info.image_uris ? card.info.image_uris.small : null } onClick={()=>props.deckModify(card, 'delete')} onMouseOver={()=>{props.handleHover(card.info)}} className={styles.cardImage} alt="magic card" height="100px" />
							</div>
						)
					}
				})}
			</div>
		</div>
	);
}

export default DeckBuilding;
