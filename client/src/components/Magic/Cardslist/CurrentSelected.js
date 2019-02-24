import React from 'react';
import styles from './Cardslist.css';

const CurrentSelected = (props) => {
	const card = props.currentSelected || null;
	// console.log('props in CurrentSelected : ', props);
	return (
		<div className={styles.currentSelected}>
			<div className={styles.titleSelected}>
				{card.name!=='There are no cards with these given filters' ? <b>{card.name}</b> : <b>Totally Lost</b>}
			</div>
			<div className={styles.addToDeck}>
				<button className={styles.button} onClick={() => props.deckModify(card, 'add')}>add to deck     >>></button>
			</div>
		</div>
	)
}

export default CurrentSelected;
