import React from 'react';
import styles from './Cardslist.css';

const Cardslist = props => {
	// console.log('inside cardslist, props: ', props);

	if(props && props.cards && props.cards.length) {
		return (
			// <div className={styles.cardsList}>
				<div className={styles.cardsUlWrapper}>
					<ul className={styles.cardsUl}>
						{
							props.cards.map(card => {
								return (
									<div key={card.id}>
										<br />
										<li>
											<b className={styles.cardSelect} onClick={()=> props.handleClick(card)} onMouseOver={()=> props.handleHover(card.id)}>{card.name}</b>
											{/* <div>{card.locationdesc}</div> */}
										</li>
									</div>
								)
							})
						}
					</ul>
					{/* <div className={styles.cardWindow}>
						<img src={ props.currentCard ? props.currentCard.imageUrl : null } className={styles.cardImage} alt="magic card" height="320px" />
					</div> */}
				</div>
			// </div>

		)
	} else {
			return <div></div>
	}
}

export default Cardslist;
