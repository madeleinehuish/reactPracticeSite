import dataMirrodin from './mirrodinTest/Mirrodin';
import dataDarksteel from './mirrodinTest/Darksteel';
import dataFifthDawn from './mirrodinTest/Fifth_Dawn';
import dataScarsofMirrodin from './mirrodinTest/Scars_of_Mirrodin';
import dataMirrodinBesieged from './mirrodinTest/Mirrodin_Besieged';
import dataNewPhyrexia from './mirrodinTest/New_Phyrexia';


let combinedData = [
	...dataMirrodin,
	...dataDarksteel,
	...dataFifthDawn,
	...dataScarsofMirrodin,
	...dataMirrodinBesieged,
	...dataNewPhyrexia
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
