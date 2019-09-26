// in addition to updating this file, will also need to update some files in data folder
// for updates also change : data/setDates.js & data/setSymbols.js

import allBlocks from '../data/standard_blocks/standard_blocks';

export const DEFAULT_BLOCK = "Oct 19 to Jan 20"; // default block
export const STANDARD_BLOCK_CURRENT = "Oct 19 to Jan 20"; // current standard block
export const ALL_BLOCKS = allBlocks;
export const CURRENT_STANDARD = { //current standard block as of present time
	name: 'Oct 19 to Jan 20',
	sets: [ 'Guilds_of_Ravnica', 'Ravnica_Allegiance', 'War_of_the_Spark', 'Core_Set_2020', 'Throne_of_Eldraine']
};
export const CURRENT_BLOCK = { //currently selected standard block
	name: 'Oct 19 to Jan 20',
	sets: [ 'Guilds_of_Ravnica', 'Ravnica_Allegiance', 'War_of_the_Spark', 'Core_Set_2020', 'Throne_of_Eldraine']
};
