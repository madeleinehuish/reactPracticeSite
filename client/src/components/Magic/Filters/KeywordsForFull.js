import React from 'react';

import keywordTypes from '../../../data/keywords/keywords';
import styles from './Filters.css';

const Keywords = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} ref={ref} onChange={(event)=>props.handleFilterKeywordFull(event)}>
			{keywordTypes.map((elem, index) => {
				return <option key={index} value={elem}>{elem}</option>
			})}
		</select>
	)
})

export default Keywords;
