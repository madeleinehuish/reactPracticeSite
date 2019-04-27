import React from 'react';
import styles from './Filters.css';

const cmc = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'cmc')} ref={ref}>
			<option default value="All CMC">All CMC</option>
			<option value="X">X cmc</option>
			<option value="0">0 cmc</option>
			<option value="1">1 cmc</option>
			<option value="2">2 cmc</option>
			<option value="3">3 cmc</option>
			<option value="4">4 cmc</option>
			<option value="5">5 cmc</option>
			<option value="6">6 cmc</option>
			<option value="7">7 cmc</option>
			<option value="8">8 cmc</option>
			<option value="9">9 cmc</option>
			<option value="10">10 cmc</option>
			<option value="11">11 cmc</option>
			<option value="12">12 cmc</option>
			<option value="13">13 cmc</option>
			<option value="14">14 cmc</option>
			<option value="15">15 cmc</option>
		</select>
	)
})

export default cmc;
