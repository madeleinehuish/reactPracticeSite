import React from 'react';
import styles from './Cardslist.css';

const Cardslist = props => {
	console.log('inside cardslist, props.cards: ', props.cards);

	if(props && props.cards && props.cards.length) {
		return (
			<ul className={styles.cardsList}>
				{
					props.cards.map(card => {
						return (
							<div>
								<br />
								<li key={card.myid}>
									<b>{card.name}</b>
									{/* <div>{card.locationdesc}</div> */}
								</li>
							</div>
						)
					})
				}
			</ul>
		)
	} else {
			return <div></div>
	}
}

export default Cardslist;
