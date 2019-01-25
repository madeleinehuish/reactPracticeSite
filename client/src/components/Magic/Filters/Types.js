import React from 'react';
import styles from './Filters.css';

const Types = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'type')} ref={ref}>
			<option default value="All">types (all)</option>
			<option value="Creature">creatures</option>
			<option value="Enchantment">enchantments</option>
			<option value="Instant">instants</option>
			<option value="Sorcery">sorceries</option>
			<option value="Planeswalker">planeswalkers</option>
			<option value="Artifact">artifacts</option>
			<option value="Land">lands</option>
		</select>
	)
})

export default Types;
