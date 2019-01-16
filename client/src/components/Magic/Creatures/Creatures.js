import React from 'react';

import creatureTypes from '../../../data/types/creatures';
import styles from './Creatures.css';

const Creatures = (props) => {

	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'creature')}>
			{creatureTypes.map(elem => {
				return <option value={elem}>{elem}</option>
			})}
		</select>
	)
}

export default Creatures;
