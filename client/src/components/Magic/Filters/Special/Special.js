import React from 'react';
import styles from './Special.css';

const Special = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'special')} ref={ref}>
			<option default value="All Special">All Special</option>
			<option value="legendary">Legendary</option>
			<option value="saga">Sagas</option>
			<option value="historic">Historic</option>
		</select>
	)
})

export default Special;
