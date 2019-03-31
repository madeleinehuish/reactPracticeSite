// import dataIxalan from './standard/data_ixalan';
// import dataRivalsOfIxalan from './standard/data_rivals';
// import dataDominaria from './standard/data_dominaria';
// import dataM19 from './standard/data_m19';
// import dataGuildsOfRavnica from './standard/data_guilds_ravnica';

const dataIxalan = require('./standard_scryfall/data_ixalan') ;
const dataRivalsOfIxalan = require('./standard_scryfall/data_rivals');
const dataDominaria = require('./standard_scryfall/data_dominaria');
const dataM19 = require('./standard_scryfall/data_m19');
const dataGuildsOfRavnica = require('./standard_scryfall/data_guilds_ravnica');
const dataRavnicaAllegiance = require('./standard_scryfall/data_ravnica_allegiance');


let combinedData = [
	...dataIxalan,
	...dataRivalsOfIxalan,
	...dataDominaria,
	...dataM19,
	...dataGuildsOfRavnica,
	...dataRavnicaAllegiance
];

let sortedInitialData = combinedData.sort((a,b) =>{
	if(a.name < b.name) return -1;
	if(a.name > b.name) return 1;
	return 0;
})

// let sortedBySet = sortedAlphabetically.filter(card => {
// 	return card.set===setFilter;
// })


module.exports = sortedInitialData;
