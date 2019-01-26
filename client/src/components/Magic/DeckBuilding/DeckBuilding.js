import React from 'react';
import styles from './DeckBuilding.css';

const DeckBuilding = (props) => {
	return (
		<div className={styles.deckWrapper}>
			<b className={styles.title}>Current Deck</b>
		</div>
	);
}

export default DeckBuilding;
