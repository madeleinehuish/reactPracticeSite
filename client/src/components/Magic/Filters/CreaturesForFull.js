import React from 'react';

import creatureTypes from '../../../data/types/creatures';
import styles from './Filters.css';

// const Creatures = (props) => {
//
// 	return (
// 		<select className={styles.select} onChange={(event)=>props.handleFilterCreatureFull(event, 'creature')}>
// 			{creatureTypes.map(elem => {
// 				return <option value={elem}>{elem}</option>
// 			})}
// 		</select>
// 	)
// }

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
