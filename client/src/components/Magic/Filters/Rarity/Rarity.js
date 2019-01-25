import React from 'react';
import styles from './Rarity.css';

const Rarity = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'rarity')} ref={ref}>
			<option default value="All">rarity (all)</option>
			<option value="mythic">mythic rare</option>
			<option value="rare">rare</option>
			<option value="uncommon">uncommon</option>
			<option value="common">common</option>
		</select>
	)
})

export default Rarity;
