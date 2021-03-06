import React from 'react';
import styles from './Cardslist.css';
import setDates from '../../../data/setDates/setDates.js';
import setSymbols from '../../../data/setSymbols/setSymbols.js';


const CurrentSelected = (props) => {
	console.log('currentSelected, props: ', props)
	const card = props.currentSelected || null;
	const cb = () => {};
	let date;
	let setName;

	console.log('first console log in CurrentSelected. Props: ', props);

	// if(!props.currentSelected) {
	// 	console.log('no props.currentSelected in CurrentSelected.js!!!!!');
	// 	console.log('props: ', props);
	// }
	// if(!props.currentSelected.set_name) setName = 'none'
	if(props.currentSelected.set_name==='Limited Edition Alpha') {
		date = '1993';
		setName = 'Alpha (Limited)'
	} else if(props.currentSelected.set_name==='Limited Edition Beta'){
		date = '1993';
		setName = 'Beta (Limited)';
	}
	// else if(props.currentSelected.set_name==='Classic Sixth Edition'){
	// 	date = '1999';
	// 	setName = 'Sixth Edition';
	// }
	else {
		for(let elem of setDates) {
			if(elem[props.currentSelected.set_name]){
				date = elem[props.currentSelected.set_name];
			}
		}
		setName = props.currentSelected.set_name;
	}
	let setSymbol = setSymbols[setName] || 'x';

	if(setName==="Duel Decks: Mirrodin Pure vs. New Phyrexia") setName = "DD: Mirrodin vs New Phyrexia";
	if(setName==="Duel Decks: Phyrexia vs. the Coalition") setName = "DD: Phyrexia vs Coalition";



	console.log('props in CurrentSelected : ', props);
	return (
		<div className={styles.currentSelected}>
			<div className={styles.titleSelected}>
				{card.name!=='There are no cards with these given filters' ?
					(card.name.length < 20 ? <b>{card.name}</b> : card.name.length > 30 ? <b className={styles.superSmallerFont}>{card.name}</b> : <b className={styles.smallerFont}>{card.name}</b>)
				: <b>Totally Lost</b>}
			</div>

			<div className={styles.setSelected}>set: {setName}&nbsp;&nbsp;&nbsp;<img className={styles.setSymbol} src={setSymbol} alt="set symbol" style={{'height': '25px', 'paddingTop': '3px'}}/></div>
			<div className={styles.setSelected}>date: {date} &nbsp;&nbsp; price: {props.currentPrice}</div>

			<div className={styles.addToDeck}>
				<button className={styles.button} onClick={() => props.addToDeck(card)}>add to deck     >>></button>
			</div>
		</div>
	)
}

export default CurrentSelected;
