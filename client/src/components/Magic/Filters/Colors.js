import React from 'react';
import styles from './Filters.css';

const Colors = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'colors')} ref={ref}>
			<option default value="All">colors (all)</option>
			<option value={null} disabled>single colors</option>
			<option value={['W']}>white</option>
			<option value={['U']}>blue</option>
			<option value={['R']}>red</option>
			<option value={['G']}>green</option>
			<option value={['B']}>black</option>
			<option value={null} disabled>colorless</option>
			<option value="Colorless">colorless</option>
			<option value={null} disabled>dual colors</option>
			<option value={['W', 'U']}>Azorius (white / blue)</option>
			<option value={['W', 'R']}>Boros (white / red)</option>
			<option value={['U', 'B']}>Dimir (blue / black)</option>
			<option value={['G', 'B']}>Golgari (green / black)</option>
			<option value={['R', 'G']}>Gruul (red / green)</option>
			<option value={['U', 'R']}>Izzet (blue / red)</option>
			<option value={['W', 'B']}>Orzhov (white / black)</option>
			<option value={['R', 'B']}>Rakdos (red / black)</option>
			<option value={['W', 'G']}>Selesnya (white / green)</option>
			<option value={['U', 'G']}>Simic (blue / green)</option>
			<option value={null} disabled>triple colors</option>
			<option value={['W', 'G', 'B']}>Abzan (white / green / black)</option>
			<option value={['W', 'G', 'U']}>Bant (white / green / blue)</option>
			<option value={['U', 'W', 'B']}>Esper (blue / white / black)</option>
			<option value={['B', 'R', 'U']}>Grixis (black / red / blue)</option>
			<option value={['U', 'R', 'W']}>Jeskai (white / blue / red)</option>
			<option value={['W', 'R', 'B']}>Mardu (white / red / black)</option>
			<option value={['W', 'G', 'R']}>Naya (white / green / red)</option>
			<option value={['U', 'G', 'B']}>Sultai (blue / green / black)</option>
			<option value={['U', 'G', 'R']}>Temur (blue / green / red)</option>
		</select>
	)
})

export default Colors;
