import React from 'react';
import styles from './Cardslist.css';

const clean = (string) => string.split('_').join(' ')

const CurrentCardInfo = ({ card, handleClick}) => {
	return (
		<div className={styles.cardsUlWrapper} onClick={handleClick}>
			<div className={styles.currentCardInfo}>
					<b>{card.name}</b>
					<p>{card.type_line}&nbsp;{card.power ? <span>{Number(card.power)}/{Number(card.toughness)}</span> : null}</p>
					<p>mana cost: {card.mana_cost}</p>
					<p>{card.oracle_text}</p>
					<p>{card.rarity} - {card.set_name}</p>
					<u>legalities</u>
					<p>standard - {clean(card.legalities.standard)}</p>
				  <p>modern - {clean(card.legalities.modern)}</p>
				  <p>commander - {clean(card.legalities.commander)}</p>
				  <p>pauper - {clean(card.legalities.pauper)}</p>
				  <p>legacy- {clean(card.legalities.legacy)}</p>
				  <p>vintage - {clean(card.legalities.vintage)}</p>
			</div>
		</div>
	)
}

export default CurrentCardInfo;
