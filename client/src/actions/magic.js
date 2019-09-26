import axios from 'axios';
import standardBlocks from '../data/standard_blocks/standard_blocks.js';
import getUrl from './development.js';
// import DATA from '../data/combinedData'; //standard
// import DATA from '../data/combinedDataTest' //mirrodin test run

import {
  DECK_ADD_TO_DECK,
  GET_DECKS_FROM_DB,
  FETCH_CARDS,
  FLIP_CURRENT_CARD,
  UPDATE_BLOCK,
  UPDATE_CARDS,
  CHANGE_CURRENT_CARD,
  SET_COLUMN_TWO,
  STORE_DECK_NAME,
  STORE_TYPE,
  STORE_CREATURE,
  STORE_KEYWORD,
  STORE_FILTER_TEXT,
  STORE_COLOR,
  STORE_RARITY,
  STORE_SET,
  STORE_CMC,
  STORE_SPECIAL,
  GET_CURRENT_PRICE
  // TEST_CARDS
} from './types';


function isSubset(arr, sub) {
  let arrMap = {};

  for(let elem of arr) {
    arrMap[elem] = (arrMap[elem] || 0) + 1;
  }

  for(let elem of sub) {
    if(!arrMap[elem]) return false;
  }

  return true;
}

//filter functions

function filterByInput(cards, filterValue) {
  // console.log('CARDS in INPUT: ', cards);
  if(filterValue==='') return cards;
  if(!cards) return;

  return cards.filter(card => {
    return card.name.substr(0,filterValue.length).toUpperCase() === filterValue.toUpperCase();
  })

}

// // DON'T remove this until back end filtering figured out
// const filterSet = (elem, filter) => {
// 	if(filter==='All') return true;
// 	if(elem.set===filter) return true;
// 	return false;
// }

const filterType = (elem, filterType, filterCreature) => {
  if(filterType==='All') return true;
  if(filterType==='Creature' && filterCreature==='All Creatures') {
    return elem.type_line.includes(filterType);
  }
  if(filterType==='Creature' && filterCreature!=='All Creatures') {
    return elem.type_line.includes(filterCreature);
  } else {
    return elem.type_line.includes(filterType);
  }
}

const filterKeyword = (elem, filterKeyword) => {
  if(filterKeyword==='keywords (all)') return true;
  // console.log('elem.oracle_text: ', elem.oracle_text)
  if(filterKeyword === 'return from graveyard') {
    if(elem.oracle_text && elem.oracle_text.toLowerCase().includes('return') && elem.oracle_text.toLowerCase().includes('graveyard')) return true;
  }
  if(filterKeyword === 'return to hand') {
    if(elem.oracle_text && elem.oracle_text.toLowerCase().includes('return') && elem.oracle_text.toLowerCase().includes("owner's hand")) return true;
  }

if(elem.oracle_text && elem.oracle_text.toLowerCase().includes(filterKeyword)) return true;
  return false;
}

//check arr
const filterColor = (elem, filtersColors, filtersType) => {

  if(!Array.isArray(filtersColors) && filtersColors==='All') return true;
  if(!Array.isArray(filtersColors) && filtersColors==='Colorless') {
  if(elem.color_identity && elem.color_identity.length > 0) return false //removes colored lands
  if(elem.colors && elem.colors.length === 0) return true; //all other colorless cases
    return false;
  }
  if(elem.layout==='transform') {
  // return true;
  if(filtersType==='Land') {
    if(!elem.card_faces[0].colors.length && !elem.card_faces[1].colors.length) return false; //so colored filter doesn't return colorless lands
    if(isSubset(filtersColors, elem.color_identity)) return true;
    return false;
  }	else  {
    if(!elem.card_faces[0].colors.length && elem.color_identity.length > 0) { //if color picked but filtersType !== land
      if(isSubset(filtersColors, elem.color_identity)) return true;
      return false;
    }
    if((elem.card_faces[0].colors.length!==0 && isSubset(filtersColors, elem.card_faces[0].colors))
      ||
      (elem.card_faces[1].colors.length!==0 && isSubset(filtersColors, elem.card_faces[1].colors))) {
      return true;
    }
    return false;
  }

} else { //elem.layout === 'normal' (non transformable cards)
    if(filtersType==='Land') {
    if(!elem.color_identity.length) return false; //so colored filter doesn't return colorless lands
    if(isSubset(filtersColors, elem.color_identity)) return true;
    return false;
}	else  {
    if(!elem.colors.length && elem.color_identity.length > 0) { //if color picked but filtersType !== land
    if(isSubset(filtersColors, elem.color_identity)) return true;
    return false;
}
  if(!elem.colors.length) return false;
  if(isSubset(filtersColors, elem.colors)) return true;
  return false;
}

}

}

const filterCMC = (elem, filter) => {

  if(filter === 'All CMC') return true;
  // console.log('elem.type_line.substr(0,4)', elem.type_line.substr(0,4));
  if(elem.type_line.includes('Land')) return false;
  if(elem.cmc === Number(filter)) return true;
  return false;
}

const filterRarity = (elem, filter) => {
  if(filter==='All') return true;
  if(elem.rarity===filter) return true;
  return false;
}

const filterSpecial = (elem, filter) => {
  if(filter==='All Special') return true;
  if(filter==='legendary') {
    if(elem.type_line.includes('Legendary')) return true;
  }
  if(filter==='saga') {
    if(elem.type_line.includes('Saga')) return true;
  }
  if(filter==='historic') {
    if(elem.type_line.includes('Saga') || elem.type_line.includes('Legendary') || elem.type_line.includes('Artifact') || elem.type_line.includes('Planeswalker')) return true;
  }
  return false;
}

export const getCurrentPrice = (card, cb) => async dispatch => {
  // const url = `https://api.scryfall.com/cards/${card.id}`;
  const url = getUrl('/price');
  const query = `?name=${card.name}&id=${card.id}`

  try {
    const response = await axios.get(url + query);
    let price = response.data;

    dispatch({
        type: GET_CURRENT_PRICE,
        payload: await price,
        meta: {
          debounce: {
              time: 100
          }
        }
    })
    cb()
  } catch (error) {
      console.log('axios error: ', error);
  }
}


export const getcards = (baseData, filters, resetTrue, cb) => async dispatch => {
  //first decide how big of dataset you want to use. 'All will default to full set'
  const filteredByInput = filterByInput(baseData, filters.text);
  const filtered = filteredByInput.filter(elem => {
    // const conditionSet = filterSet(elem, filters.set);
    const conditionKeyword = filterKeyword(elem, filters.keyword);
    const conditionCMC = filterCMC(elem, filters.cmc);
    const conditionType = filterType(elem, filters.type, filters.creature);
    const conditionColor = filterColor(elem, filters.color, filters.type);
    const conditionRarity = filterRarity(elem, filters.rarity);
    const conditionSpecial = filterSpecial(elem, filters.special);
    return conditionKeyword && conditionType && conditionColor && conditionRarity && conditionSpecial && conditionCMC;
  });

  if(!filtered.length) filtered[0] =  {
    name: "There are no cards with these given filters",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card"
  };
  if(resetTrue) {
    dispatch({
    type: FETCH_CARDS,
    payload: filtered
    })
  } else {
    dispatch({
    type: UPDATE_CARDS,
    payload: filtered
    })
  }
  cb();
}

export const quickSetStateDecks = (decks) => {
  return {
    type: GET_DECKS_FROM_DB,
    payload: decks
  }
}


export const getDecksFromDB = cb => async dispatch => {
const url = getUrl('/decks');

// //development
// const url = 'http://localhost:3090/decks';

// //production
// const url = 'https://radiant-stream-78248.herokuapp.com/decks';

const email = localStorage.getItem('user_email');

const query = `?email=${email}`;

try {
const response = await axios.get(url + query);

console.log('response from database after getting decks: ', response);
// if(!response.name) response.name='undefined';

dispatch({
  type: GET_DECKS_FROM_DB,
  payload: await response.data
});

cb(await response.data)
} catch (error) {
    console.log('axios error: ', error);
    cb();
  }
};

export const addToCurrentDeck = (card, deck) => {
// console.log('deckAddTo card: ', card);
console.log('deck in add to current deck: ', deck)
// let currentNumber = 0;
let newDeck = [...deck];
// let newDeck = deck.deck;
let isDup = false;

for(let elem of newDeck) {
  if(elem.name && elem.name === card.name ) {
      isDup = true;
    if(elem.number < 4) {
      elem.number = elem.number + 1;
    } else {
      elem.number = 4;
    }
  }
}

if(isDup===false || !newDeck.length) newDeck.push({
  name: card.name,
  number: 1,
  info: card
});

return {
  type: DECK_ADD_TO_DECK,
  payload: newDeck
}

};

export const changeCurrentDeck = (deckData, cb) => async dispatch => {
  if(deckData.deck_name==='new deck') {
    dispatch({
      type: DECK_ADD_TO_DECK,
      payload: []
    });
    dispatch({
      type: STORE_DECK_NAME,
      payload: 'new deck'
    });
    cb()
  }
  dispatch({
    type: DECK_ADD_TO_DECK,
    payload: deckData.deck
  });
  dispatch({
    type: STORE_DECK_NAME,
    payload: deckData.deck_name
  });
  cb()
};

export const modifyDeck = (card, deck, type, cb) => async dispatch => {
  switch(type) {
      // case 'add':
      // 			{
      // 				// console.log('deckAddTo card: ', card);
      // 				console.log('deck: ', )
      // 				// let currentNumber = 0;
      // 				let newDeck = [...deck];
      // 				// let newDeck = deck.deck;
      // 				let isDup = false;
      //
      // 				for(let elem of newDeck) {
      // 					if(elem.name && elem.name === card.name ) {
      // 						isDup = true;
      // 						if(elem.number < 4) {
      // 							elem.number = elem.number + 1;
      // 						} else {
      // 							elem.number = 4;
      // 						}
      // 					}
      // 				}
      //
      // 				if(isDup===false || !newDeck.length) newDeck.push({
      // 					name: card.name,
      // 					number: 1,
      // 					info: card
      // 				});
      //
      //
      // 				dispatch({
      // 					type: DECK_ADD_TO_DECK,
      // 					payload: newDeck
      // 				});
      //
      // 				dispatch({
      // 					type: STORE_DECK_NAME,
      // 					payload: deck.name
      // 				});
      //
      // 				cb()
      // 			}
      // 			break;
      // case 'changeDeck':
      // 			{
      // 				console.log('modifyDeck, : card, deck, type', card, deck, type);
      // 				// console.log('deck: ', )
      // 				// let currentNumber = 0;
      // 				// let newDeck = [...deck.deck];
      //
      // 				dispatch({
      // 					type: DECK_ADD_TO_DECK,
      // 					payload: deck.deck
      // 				});
      //
      // 				dispatch({
      // 					type: STORE_DECK_NAME,
      // 					payload: deck.name
      // 				});
      //
      // 				cb(deck.deck)
      // 			}
      // 			break;
      case 'delete':
      {
        let newDeck = [...deck];
        newDeck.forEach(elem => {
            if(elem.name && elem.name === card.name) {
                elem.number = elem.number - 1;
            }
        })
        let filtered = newDeck.filter(elem => {
            return elem.number > 0;
        })

        dispatch({
            type: DECK_ADD_TO_DECK,
            payload: filtered
        });
        cb();
      }
      break;
      // case 'changeDeck':
      // {
      // 	dispatch({
      // 		type: DECK_ADD_TO_DECK,
      // 		payload: deck
      // 	})
      // 	cb();
      // }
      // break;
      case 'reset':
      {
        let newDeck = [];

        dispatch ({
          type: DECK_ADD_TO_DECK,
          payload: newDeck
        });
        dispatch({
          type: STORE_DECK_NAME,
          payload: 'unnamed deck'
        });
        //add another dispatch here to modify select state and possibly input state
        cb()
      }
      break;
      default:
      break;
  }
};

export const changeCurrentCard = (card) => {
  return {
    type: CHANGE_CURRENT_CARD,
    payload: card
  }
};

export const flipCurrentCardAction = (isFlipped) => {
  return {
    type: FLIP_CURRENT_CARD,
    payload: isFlipped
  }
};

export const setColumnTwo = (columnTwo) => {
  return {
    type: SET_COLUMN_TWO,
    payload: !columnTwo
  }
};

export const storeDeckName = deckName => {
  return {
    type: STORE_DECK_NAME,
    payload: deckName
  };
};

export const storeFilterText = (text, cb) => async dispatch => {
  dispatch({
    type: STORE_FILTER_TEXT,
    payload: text
  });
  cb();
};

export const storeType = (type, cb) => async dispatch => {
  dispatch({
    type: STORE_TYPE,
    payload: type
  });
  cb();
};

export const storeCreature = (creature, cb) => async dispatch => {
  dispatch({
    type: STORE_CREATURE,
    payload: creature
  });
  cb();
};

export const storeCMC = (cmc, cb) => async dispatch => {
  dispatch({
    type: STORE_CMC,
    payload: cmc
  })
  cb();
};

export const resetBlock = (block, cb) => async dispatch => {
  dispatch({
    type: UPDATE_BLOCK,
    name: block.name,
    payload: block.sets
  })
  cb();
};

export const storeKeyword = (keyword, cb) => async dispatch => {
  dispatch({
    type: STORE_KEYWORD,
    payload: keyword
  });
  cb();
};

export const storeColor = (color, cb) => async dispatch => {
  dispatch({
      type: STORE_COLOR,
      payload: color
  });
  cb();
};

export const storeRarity = (rarity, cb) => async dispatch => {
  dispatch({
    type: STORE_RARITY,
    payload: rarity
  });
  cb();
};

export const storeSet = (set, cb) => async dispatch => {
  dispatch({
    type: STORE_SET,
    payload: set
  });
  cb();
};

export const storeSpecial = (special, cb) => async dispatch => {
  dispatch({
      type: STORE_SPECIAL,
      payload: special
  });
  cb();
};

export const saveDeckToDB = (data) => async dispatch => {
  const url = getUrl('/decks');
  const email = localStorage.getItem('user_email');
  data.email = email;

  try {
      const response = await axios.post(url, data);
      console.log('response: ', response);
  } catch (error) {
      console.log('axios error: ', error);
  }
};

export const updateBlock = (name, cb) => async dispatch => {
  console.log('inside updateBlock, name: ', name)
  const url = getUrl('/filterbyblock');
  const sets = standardBlocks.filter(elem => { //this is unstable
      return elem.name===name
  })[0].sets;
  const query = `?name=${name}`;

  try {
      const response = await axios.get(url + query);
      dispatch({
          type: UPDATE_BLOCK,
          name: name,
          payload: sets
      })
      dispatch({
          type: FETCH_CARDS,
          payload: response.data
      })
      cb();
  } catch (error) {
      console.log('axios error: ', error);
  }
};

export const getSingle = (term, cb) => async dispatch => {
const url = getUrl('/filtersinglecard');
//http://localhost:3090/filtersinglecard?name=counterspell

// //development
// const url = 'http://localhost:3090/filtersinglecard';

// //production
// const url = 'https://radiant-stream-78248.herokuapp.com/filtersinglecard';

const query = `?name=${term}`;

try {
    const response = await axios.get(url + query);

    // console.log('response: ', response);

    dispatch({
        type: FETCH_CARDS,
        payload: response.data
    })

    cb()
} catch (error) {
    console.log('axios error: ', error);
}

};

export const getKeywordsFromDatabase = (filter, cb) => async dispatch => {

  const url = getUrl('/filterskeyword');

  const query = `?keyword=${filter}`;

  try {
      const response = await axios.get(url + query);

      // console.log('response: ', response);

      dispatch({
          type: FETCH_CARDS,
          payload: response.data
      })

      cb()
  } catch (error) {
      console.log('axios error: ', error);
  }

};

export const getCreaturesFromDatabase = (filter, cb) => async dispatch => {
  const url = getUrl('/filtersCreatures');

  const query = `?creature=${filter}`;
  console.log('query: ', query);
  try {
      const response = await axios.get(url + query);

      console.log('response: ', response);

      dispatch({
          type: FETCH_CARDS,
          payload: response.data
      })

      cb()
  } catch (error) {
      console.log('axios error: ', error);
  }
}

export const getCardsFromDatabase = (filters, cb) => async dispatch => {

  console.log('in getCardsFromDatabase in magic.js: ', filters);
  const url = getUrl('/cards');
  const query = `?set=${filters.set}&type=${filters.type}&color=${filters.colors}&rarity=${filters.rarity}`

  try {
  const response = await axios.get(url + query);
      console.log('response: ', response);

      dispatch({
      type: FETCH_CARDS,
      payload: response.data
      })

      cb()
  } catch (error) {
      console.log('axios error: ', error);
  }

};


export const getAllCardsFromDatabase = (filters, cb) => async dispatch => {

  // const url = 'http://localhost:3090/allcards'
  const url = getUrl('/allcards');
  const query = `?type=${filters.type}&color=${filters.colors}&rarity=${filters.rarity}`

  try {
  const response = await axios.get(url + query);

  dispatch({
      type: FETCH_CARDS,
      payload: response.data
  })

  cb()
  } catch (error) {
  console.log('axios error: ', error);
  }

};
