import React from 'react';
import styles from './Cardslist.css';

const CurrentSelected = (props) => {
	// console.log('current selected props: ', props.currentSelected.name);
	return (
		<div className={styles.currentSelected}>
			<div className={styles.titleSelected}>
				<b>{props.currentSelected.name}</b>
				<div className={styles.addToDeck}>
					add to deck     >>>
				</div>
			</div>
		</div>
	)
}

export default CurrentSelected;
