// import dataIxalan from './standard/data_ixalan';
// import dataRivalsOfIxalan from './standard/data_rivals';
// import dataDominaria from './standard/data_dominaria';
// import dataM19 from './standard/data_m19';
// import dataGuildsOfRavnica from './standard/data_guilds_ravnica';

// import dataIxalan from './standard_scryfall/data_ixalan';
// import dataRivalsOfIxalan from './standard_scryfall/data_rivals';
// import dataDominaria from './standard_scryfall/data_dominaria';
// import dataM19 from './standard_scryfall/data_m19';
import dataGuildsOfRavnica from './standard_scryfall/data_guilds_ravnica';
import dataRavnicaAllegiance from './standard_scryfall/data_ravnica_allegiance';
import dataWaroftheSpark from './standard_scryfall/data_war_of_the_spark';
import dataM20 from './standard_scryfall/data_m20';
import dataThroneOfEldraine from './standard_scryfall/data_throne_of_eldraine';


let combinedData = [
	...dataGuildsOfRavnica,
	...dataRavnicaAllegiance,
	...dataWaroftheSpark,
	...dataM20,
	...dataThroneOfEldraine,
];

let sortedInitialData = combinedData.sort((a,b) =>{
	if(a.name < b.name) return -1;
	if(a.name > b.name) return 1;
	return 0;
})

// let sortedBySet = sortedAlphabetically.filter(card => {
// 	return card.set===setFilter;
// })


export default sortedInitialData;
