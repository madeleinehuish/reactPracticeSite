import React from 'react';

import keywordTypes from '../../../../data/keywords/keywords';
import styles from './Keywords.css';

const Keywords = React.forwardRef((props, ref) => {
	return (
		<select className={styles.select} ref={ref} onChange={(event)=>props.handleFilter(event, 'keyword')}>
			{keywordTypes.map(elem => {
				return <option value={elem}>{elem}</option>
			})}
		</select>
	)
})

export default Keywords;
