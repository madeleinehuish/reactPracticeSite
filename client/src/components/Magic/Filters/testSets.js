import React from 'react';
import styles from './Filters.css';

const TestSets = React.forwardRef((props, ref) => {

	const setArray = [
		{ name: 'Ice Age', id: 'ice' },
		{ name: 'Alliances', id: 'chr'},
		{ name: 'Coldsnap', id: 'ren'},
		{ name: 'Mirage', id: 'mir'},
		{ name: 'Visions', id: 'vis'},
		{ name: 'Fifth Edition', id: '5ed'},
		{ name: 'Portal', id: 'por'},
		{ name: 'Weatherlight', id: 'wth'},
		{ name: 'Tempest', id: 'tmp'},
		{ name: 'Stronghold', id: 'sth'},
		{ name: 'Exodus', id: 'exo'},
		{ name: "Urza's Saga", id: 'usg'},
		{ name: "Urza's Legacy", id: 'ulg'}
		// { name: "Sixth Edition", id: '6ed'}
		// { name: "Urza's Destiny", id: 'uds'},
		// { name: 'Mercadian Masques', id: ''},
		// { name: 'Nemesis', id: ''},
		// { name: 'Prophecy', id: ''},
		// { name: 'Apocalypse', id: ''},
		// { name: 'Odyssey', id: ''},
		// { name: 'Torment', id: ''},
		// { name: 'Judgment', id: ''},
		// { name: 'Onslaught', id: ''},
		// { name: 'Legions', id: ''},
		// { name: 'Scourge', id: ''},
		// { name: 'Mirrodin', id: ''},
		// { name: 'Darksteel', id: ''},
		// { name: 'Fifth Dawn', id: ''}

	]

	let list = setArray.map(elem => {
		return <option key={elem.id} value={elem.id}>{elem.name}</option>
	})


	return (
		<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'set')} ref={ref}>
			<option default value="All">sets (all)</option>
			{list}
		</select>
	)
})

export default TestSets;
