import React from 'react';
import styles from './Cardslist.css';

const CurrentCardInfo = (props) => {
	return (
		<div className={styles.cardsUlWrapper} onClick={props.handleClick}>
			<div className={styles.currentCardInfo}>
					<b>{props.card.name}</b>
					<p>{props.card.type_line}&nbsp;{props.card.power ? <span>{Number(props.card.power)}/{Number(props.card.toughness)}</span> : null}</p>
					<p>mana cost: {props.card.mana_cost}</p>
					<p>{props.card.oracle_text}</p>
					<p>{props.card.rarity} - {props.card.set_name}</p>

			</div>

		</div>
	)
}

export default CurrentCardInfo;
