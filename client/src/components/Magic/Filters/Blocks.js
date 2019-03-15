import React from 'react';
import styles from './Filters.css';
import allBlocks from '../../../data/standard_blocks/standard_blocks';

const standardBlocks = React.forwardRef((props, ref) => {
	let list = allBlocks.map(elem => {
		// console.log('inside of standardBlocks: name: ', elem.name, ' sets: ', elem.sets);

		return <option value={elem.name} val="test" key={elem.name} onClick={(event)=>props.handleNewBlock(event)}>{elem.name}</option>
	})

	return (
		<select className={styles.select} onChange={(event)=>props.handleNewBlock(event)} ref={ref}>
			<option default value="Jan 19 to Apr 19">sort by block (current)</option>
			{list}
			{/* <option value="mrd">Mirrodin</option>
			<option value="dst">Darksteel</option>
			<option value="5dn">Fifth Dawn</option>
			<option value="som">Scars of Mirrodin</option>
			<option value="mbs">Mirrodin Besieged</option>
			<option value="nph">New Phyrexia</option> */}
		</select>
	)
})

export default standardBlocks;
