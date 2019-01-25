import React from 'react';
import styles from './Sets.css';

const Sets = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'set')} ref={ref}>
			<option default value="All">sets (all)</option>
			<option value="xln">Ixalan</option>
			<option value="rix">Rivals of Ixalan</option>
			<option value="dom">Dominaria</option>
			<option value="m19">Core Set 2019</option>
			<option value="grn">Guilds of Ravnica</option>
			<option value="rna">Ravnica Allegiance</option>
		</select>
	)
})

export default Sets;
