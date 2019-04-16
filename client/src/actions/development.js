const getUrl = (page) => {

	//change this line for heroku or development
	/////////////////////////////
	const DEVELOPMENT = true;
	////////////////////////////

	const DEVELOPMENT_URL = 'http://localhost:3090';
	const PRODUCTION_URL = 'https://radiant-stream-78248.herokuapp.com';

	let url;
	// let page = '/decks';
	if(DEVELOPMENT) {
		url = DEVELOPMENT_URL + page;
	} else {
		url = PRODUCTION_URL + page;
	}
	return url;
}

export default getUrl;
