import React from 'react';
import styles from './Filters.css';

const Colors = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'colors')} ref={ref}>
			<option default value="All">colors (all)</option>
			<option value={['W']}>white</option>
			<option value={['U']}>blue</option>
			<option value={['R']}>red</option>
			<option value={['G']}>green</option>
			<option value={['B']}>black</option>
			<option value={['W', 'U']}>white / blue</option>
			<option value={['W', 'R']}>white / red</option>
			<option value={['W', 'G']}>white / green</option>
			<option value={['W', 'B']}>white / black</option>
			<option value={['U', 'R']}>blue / red</option>
			<option value={['U', 'G']}>blue / green</option>
			<option value={['U', 'B']}>blue / black</option>
			<option value={['R', 'G']}>red / green</option>
			<option value={['R', 'B']}>red / black</option>
			<option value={['G', 'B']}>green / black</option>
			<option value="Colorless">colorless</option>
		</select>
	)
})

export default Colors;
