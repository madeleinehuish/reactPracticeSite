const dataFull = require('./largeData/combinedData_Full.js');
const blocksAll = require('./largeData/standard_blocks/standard_blocks.js');
const dataStandard = require('./largeData/combinedData_Standard.js');

const filterKeyword = (filterKey) => {
	console.log('filterKeyword function: ', filterKey)
	let filtered = dataFull.filter(elem => {
		// console.log('elem: ', elem);
		if(filterKey.keyword==='keywords (all)') return true;
		// console.log('elem.oracle_text: ', elem.oracle_text)
		if(filterKey.keyword === 'return from graveyard') {
			if(elem.oracle_text && elem.oracle_text.toLowerCase().includes('return') && elem.oracle_text.toLowerCase().includes('graveyard')) return true;
		}
		if(filterKey.keyword=== 'return to hand') {
			if(elem.oracle_text && elem.oracle_text.toLowerCase().includes('return') && elem.oracle_text.toLowerCase().includes("owner's hand")) return true;
		}
		// console.log('elem.oracle_text: ', elem.oracle_text);
		if(elem.oracle_text && elem.oracle_text.toLowerCase().includes(filterKey.keyword)) {
			// console.log('hit equals:::::::')
			return true;
		}
		return false;
	})
	// console.log('filtered: ', filtered);
	return filtered;
}

const filterSingleCard = (filterValue) => {

		// console.log('CARDS in INPUT: ', cards);
		console.log('filterValue: ', filterValue);
		// if(!cards) return;
		if(filterValue==='no term') {
			return dataStandard;
		}

		let filtered = dataFull.filter(card => {
			 return card.name.substr(0,filterValue.length).toUpperCase() === filterValue.toUpperCase();
		 }).sort((a, b) => {
        return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
      })

		if(!filtered.length) filtered[0] =  {
				name: "There are no cards with these given filters",
				imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card"
		};

		// if(filtered.length > 1600) {
		// 	console.log('GREATER RETURN THAN 1600!!!!');
		// 	console.log('filtered.length: ', filtered.length)
		// 	return [{ name: 'GREATER RETURN THAN 1600!!!!' + filtered.length, imageUrl: 'https://img.scryfall.com/cards/large/en/mm3/249.jpg?1535416219'}]
		// }
		 console.log('filtered.length: ', filtered.length);
		 return filtered;
}

const filterSets = (filter) => {
	let dataSet = dataFull.filter(elem => {
		if(filter==='All') return true;
		// if(filter==='Sixth Edition' && elem.set_name==='Classic Sixth Edition') return true;
		let checkForApostrophe = elem.set_name.split("'").join('');
		if(checkForApostrophe===filter || elem.set_name===filter || elem.set===filter) return true;
		return false
	})
	return dataSet;
}

const filterType = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.type_line.includes(filter)) return true;
	return false;
}

const filterColor = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.color_identity.includes(filter)) return true;
	return false;
}

const filterRarity = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.rarity===filter) return true;
	return false;
}



const applyFilters = (filters) => {
	console.log('inside applyFilters, filters: ', filters)
	let data = filterSets(filters.set); //first decide how big of dataset you want to use. 'All will default to full set'
	console.log('data (filters.set): ', data)
	let filtered = data.filter(elem => {
		const conditionType = filterType(elem, filters.type);
		const conditionColor = filterColor(elem, filters.color);
		const conditionRarity = filterRarity(elem, filters.rarity);

		return ( conditionType && conditionColor && conditionRarity);
	})
	// console.log('filtered: ', filtered)
	return filtered;
}

const applyFiltersAll = (filters) => {
	let filtered = dataFull.filter(elem => {
		const conditionType = filterType(elem, filters.type);
		const conditionColor = filterColor(elem, filters.color);
		const conditionRarity = filterRarity(elem, filters.rarity);

		return ( conditionType && conditionColor && conditionRarity);
	})
	return filtered;

}

const applyFiltersByBlock = async (name) => {
	let block = blocksAll.filter(elem => {
		return(elem.name===name);
	});

	// console.log('block.sets: ', block[0].sets);
	let sets = block[0].sets;
	let trimmed = sets.map(elem => {
		return elem.split('_').join(' ');
	})
	// console.log('trimmed sets: ', trimmed)
	let filtered = await dataFull.filter(elem => {
		// console.log('elem.set: ', elem.set_name);
		// console.log('elem.name: ', elem.name);
		// if(sets.indexOf(elem.set_name)=== -1) console.log('found: ', elem.set_name);
		// return (sets.includes(elem.set));
		return trimmed.indexOf(elem.set_name) !== -1;
		// return false
	})
	// console.log('filtered: ', await filtered);
	return filtered
}

exports.filterKeywords = function(req, res, next) {
	console.log('filterKeywords: ', req.query)
	let returnData = filterKeyword(req.query);

	res.send(returnData);
}

exports.filterCards = function(req, res, next) {

	console.log('Req.query for filterCards: ', req.query);
	let returnData = applyFilters(req.query);
	// console.log('returnData: ', returnData)
	res.send(returnData);
}

exports.filterCardSingle = async function(req, res, next) {
	let filtered = await filterSingleCard(req.query.name);

	res.send(filtered);
}

exports.filterCardsAll = function(req, res, next) {

	let returnData;
	// console.log('Req.query for filterCardsAll: ', req.query);

	let filtered = applyFiltersAll(req.query.sets);

	// if(filtered.length > 1000) {
	// 	returnData = filtered.slice(0,1000);
	// }
	// console.log('returnData.length: ', returnData);

	res.send(returnData);
}

exports.filterCardsByBlock = async function(req, res, next) {
	console.log('Req.query for filterCardsByBlock: ', req.query); //should recieve an object with keys name(string) and sets(array)

	// let filtered = await applyFiltersByBlock(req.query.name);
	//
	// res.send(filtered);
	res.send(await applyFiltersByBlock(req.query.name))
}

exports.callScryfallAPI = async function(req, res, next) {
	console.log('Calling Scryfall, req.query: ', req.query);

	res.send('completed');
}
