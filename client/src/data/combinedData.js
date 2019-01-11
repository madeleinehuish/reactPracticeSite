
import dataIxalan from './standard/data_ixalan';
import dataRivalsOfIxalan from './standard/data_rivals';
import dataDominaria from './standard/data_dominaria';
import dataM19 from './standard/data_m19';
import dataGuildsOfRavnica from './standard/data_guilds_ravnica';


let combinedData = [
	...dataIxalan,
	...dataRivalsOfIxalan,
	...dataDominaria,
	...dataM19,
	...dataGuildsOfRavnica
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
