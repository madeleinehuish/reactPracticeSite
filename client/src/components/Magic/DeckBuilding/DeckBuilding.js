import React from 'react';
import styles from './DeckBuilding.css';

const DeckBuilding = (props) => {
	return (
		<div className={styles.deckWrapper}>
			<b className={styles.title}>Current Deck</b>
			<div className={styles.deckGrid}>
				{props.deck.map(card => {
					return (
						<div className={styles.cardDiv}>
							<img src={ card.image_uris ? card.image_uris.small : null } className={styles.cardImage} alt="magic card" height="100px" />
						</div>

					)
				})}
			</div>
		</div>
	);
}

export default DeckBuilding;
