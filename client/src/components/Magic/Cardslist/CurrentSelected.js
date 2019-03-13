import React from 'react';
import styles from './Cardslist.css';
import setDates from '../../../data/setDates/setDates.js';

const CurrentSelected = (props) => {
	const card = props.currentSelected || null;
	let date;
	let setName;
	if(props.currentSelected.set_name==='Limited Edition Alpha') {
		date = '1993';
		setName = 'Alpha (Limited)'
	} else if(props.currentSelected.set_name==='Limited Edition Beta'){
		date = '1993';
		setName = 'Beta (Limited)';
	} else if(props.currentSelected.set_name==='Classic Sixth Edition'){
		date = '1999';
		setName = 'Sixth Edition';
	} else {
		for(let elem of setDates) {
			if(elem[props.currentSelected.set_name]){
				date = elem[props.currentSelected.set_name];
			}
		}
		setName = props.currentSelected.set_name;
	}

	// console.log('props in CurrentSelected : ', props);
	return (
		<div className={styles.currentSelected}>
			<div className={styles.titleSelected}>
				{card.name!=='There are no cards with these given filters' ? <b>{card.name}</b> : <b>Totally Lost</b>}

			</div>
			<div className={styles.setSelected}>set: {setName}</div>
			<div className={styles.setSelected}>date: {date}</div>
			<div className={styles.addToDeck}>

				<button className={styles.button} onClick={() => props.deckModify(card, 'add')}>add to deck     >>></button>
			</div>
		</div>
	)
}

export default CurrentSelected;
