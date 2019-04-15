import React from 'react';
import styles from './Filters.css';

const StandardSets = React.forwardRef((props, ref) => {

	let list = props.currentBlock.sets.map((elem, index) => {
		return <option value={elem.set} key={Date.now() + index}>{elem.split('_').join(' ')}</option>
	})
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'set')} ref={ref}>
			<option default value="All">all standard (current block)</option>
			{list}
		</select>
	)
})

export default StandardSets;
