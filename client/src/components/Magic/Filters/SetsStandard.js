import React from 'react';
import styles from './Filters.css';

const StandardSets = React.forwardRef((props, ref) => {
	// return (
	// 	<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'set')} ref={ref}>
	// 		<option default value="All">sort standard (all)</option>
	// 		<option value="xln">Ixalan</option>
	// 		<option value="rix">Rivals of Ixalan</option>
	// 		<option value="dom">Dominaria</option>
	// 		<option value="m19">Core Set 2019</option>
	// 		<option value="grn">Guilds of Ravnica</option>
	// 		<option value="rna">Ravnica Allegiance</option>
	// 		{/* <option value="mrd">Mirrodin</option>
	// 		<option value="dst">Darksteel</option>
	// 		<option value="5dn">Fifth Dawn</option>
	// 		<option value="som">Scars of Mirrodin</option>
	// 		<option value="mbs">Mirrodin Besieged</option>
	// 		<option value="nph">New Phyrexia</option> */}
	// 	</select>
	// )
	let list = props.currentBlock.sets.map(elem => {
		return <option value={elem.set} key={elem.set}>{elem.split('_').join(' ')}</option>
	})
	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'set')} ref={ref}>
			<option default value="All">sort standard (all)</option>
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

export default StandardSets;
