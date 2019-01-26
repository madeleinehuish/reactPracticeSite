import React from 'react';
import styles from './Cardslist.css';

const CurrentSelected = (props) => {
	const card = props.currentSelected || null;
	console.log('props in CurrentSelected : ', props);
	return (
		<div className={styles.currentSelected}>
			<div className={styles.titleSelected}>
				<b>{card.name}</b>
			</div>
			<div className={styles.addToDeck}>
				<button className={styles.button} onClick={() => props.addToDeck(card)}>add to deck     >>></button>
			</div>
		</div>
	)
}

export default CurrentSelected;
