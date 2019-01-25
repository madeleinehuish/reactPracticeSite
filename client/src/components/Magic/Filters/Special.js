import React from 'react';
import styles from './Filters.css';

const Special = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'special')} ref={ref}>
			<option default value="All Special">special (all)</option>
			<option value="legendary">Legendary</option>
			<option value="saga">Sagas</option>
			<option value="historic">Historic</option>
		</select>
	)
})

export default Special;
