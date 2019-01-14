const dataFull = require('./largeData/combinedData.js');

const filterSets = (filter) => {
	if(filter==='All') {
		// console.log('dataFull: ', dataFull)
		return dataFull.combinedData;
	} else {
		return dataFull[filter];
	}
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
	let data = filterSets(filters.set); //first decide how big of dataset you want to use. 'All will default to full set'
	console.log('filters: ', filters);
	// console.log('data: ', data);
	// return data;
	let filtered = data.filter(elem => {
		const conditionType = filterType(elem, filters.type);
		const conditionColor = filterColor(elem, filters.color);
		const conditionRarity = filterRarity(elem, filters.rarity);

		return ( conditionType && conditionColor && conditionRarity);
	})
	return filtered;
}

exports.filterCards = function(req, res, next) {
	// console.log('Req in filterCards /cards: ', req);
	console.log('Req.query: ', req.query);
	let returnData = applyFilters(req.query);
	// let returnObject = (returnData);
	// let testArray = [1,3,5];
	// let returnData = ({ testArray });
	res.send(returnData);
}
