import React from 'react';

import creatureTypes from '../../../data/types/creatures';
import styles from './Filters.css';

const Creatures = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} ref={ref} onChange={(event)=>props.handleFilterCreatureFull(event, 'creature')}>
			{creatureTypes.map((elem, index) => {
				return <option key={index} value={elem}>{elem}</option>
			})}
		</select>
	)
})

export default Creatures;
