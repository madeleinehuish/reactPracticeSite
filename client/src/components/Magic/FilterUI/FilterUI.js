import React from 'react';
import styles from './FilterUI.css';
import EmptyWrapper from '../../EmptyWrapper/EmptyWrapper';

const FilterUI = (props) => {
	return (
		<EmptyWrapper>
			<div className={styles.filters}>
				<button id="magicButton" className={styles.button} onClick={()=>props.reset()}>Reset</button>
			</div>
			<div className={styles.filters}>
				<input className={styles.input} placeholder="type to filter" onChange={(event)=>props.handleFilter(event, 'text')} ref={props.inputBoxRef}/>
			</div>
			<div className={styles.filters}>
				<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'type')} ref={props.selectBoxRef}>
					<option default value="All">types (all)</option>
					<option value="Creature">creatures</option>
					<option value="Enchantment">enchantments</option>
					<option value="Instant">instants</option>
					<option value="Sorcery">sorceries</option>
					<option value="Planeswalker">planeswalkers</option>
					<option value="Artifact">artifacts</option>
					<option value="Land">lands</option>
				</select>
			</div>
			<div className={styles.filters}>
				<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'color')} ref={props.colorBoxRef}>
					<option default value="All">colors (all)</option>
					<option value="W">white</option>
					<option value="U">blue</option>
					<option value="R">red</option>
					<option value="G">green</option>
					<option value="B">black</option>
					<option value="Colorless">colorless</option>
				</select>
			</div>

			<div className={styles.filters}>
				<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'rarity')} ref={props.rarityBoxRef}>
					<option default value="All">rarity (all)</option>
					<option value="mythic">mythic rare</option>
					<option value="rare">rare</option>
					<option value="uncommon">uncommon</option>
					<option value="common">common</option>
				</select>
			</div>

			<div className={styles.filters}>
				<select className={styles.select} onChange={(event)=>props.handleFilter(event, 'set')} ref={props.setBoxRef}>
					<option default value="All">sets (all)</option>
					<option value="xln">Ixalan</option>
					<option value="rix">Rivals of Ixalan</option>
					<option value="dom">Dominaria</option>
					<option value="m19">Core Set 2019</option>
					<option value="grn">Guilds of Ravnica</option>
				</select>
			</div>
		</EmptyWrapper>
	)
}

export default FilterUI;
