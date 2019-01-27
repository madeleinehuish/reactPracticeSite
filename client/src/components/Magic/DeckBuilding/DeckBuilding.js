import React from 'react';
import styles from './DeckBuilding.css';
import EmptyWrapper from '../../EmptyWrapper/EmptyWrapper';

const Multiples = (props) => {
	// let multipleJSX = '';
	// for(let i = 1; i <= props.card.number; i++){
	// 	multipleJSX = multipleJSX
	// 										+ `<div className={styles.cardDiv} style={{ zIndex: ${i}, marginTop: '${i*2}'}}>
	// 												<img src={ card.info.image_uris ? card.info.image_uris.small : null } className={styles.cardImage} alt="magic card" height="100px" />
	// 											 </div>`
	// }
	// let multipleJSX = () => (
	//
	// )
	let multiplesArr = [<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } key='1' onClick={()=>props.deckModify(props.card, 'delete')} onMouseOver={()=>{props.handleHover(props.card.info)}} style={{ position: 'relative' }} className={styles.cardImage} alt="magic card" height="100px" />];
	for(let i = 2; i <= props.card.number; i++){
		let margin=5*(i-1);

		multiplesArr.push(<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } key={i} onClick={()=>props.deckModify(props.card, 'delete')} onMouseOver={()=>{props.handleHover(props.card.info)}} style={{ position: 'absolute', zIndex: i, marginTop: `${margin}px`, marginLeft: `${margin}px`}} className={styles.cardImage} alt="magic card" height="100px" />)
	}

	return (
		<EmptyWrapper>
			<div className={styles.cardDiv} >
				{multiplesArr}
				{/* <img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } style={{ position: 'absolute' }} className={styles.cardImage} alt="magic card" height="100px" />
				<img src={ props.card.info.image_uris ? props.card.info.image_uris.small : null } style={{ position: 'relative', zIndex: 1, marginTop: `5px`, marginLeft: `5px`}} className={styles.cardImage} alt="magic card" height="100px" /> */}
			</div>
		</EmptyWrapper>
	)
}

const DeckBuilding = (props) => {
	return (
		<div className={styles.deckWrapper}>
			<b className={styles.title}>Current Deck</b>
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
