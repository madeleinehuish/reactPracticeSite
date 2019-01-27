const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our model

const deckSchema = new Schema({
	name: String,
	number: Number,
	info: [{
					object: String,
					id: { type: String, unique: true, lowercase: false},
					oracle_id: { type: String, unique: true, lowercase: false},
					multiverse_ids: [],
					mtgo_id: { type: Number, unique: true, lowercase: false},
					mtgo_foil_id: { type: Number, unique: true, lowercase: false},
					arena_id: { type: Number, unique: true, lowercase: false},
					tcgplayer_id: { type: Number, unique: true, lowercase: false},
					name: String,
					lang: String,
					released_at: String,
					uri:
					 String,
					scryfall_uri:
					 String,
					layout: String,
					highres_image: Boolean,
					image_uris:
					 { small:
							String,
						 normal:
							String,
						 large:
							String,
						 png:
							String,
						 art_crop:
							String,
						 border_crop:
							String },
					mana_cost: String,
					cmc: Number,
					type_line: String,
					oracle_text:
					 String,
					colors: [],
					color_identity: [],
					legalities:
					 { standard: String,
						 future: String,
						 frontier: String,
						 modern: String,
						 legacy: String,
						 pauper: String,
						 vintage: String,
						 penny: String,
						 commander: String,
						 '1v1': String,
						 duel: String,
						 brawl: String },
					games: [],
					reserved: Boolean,
					foil: Boolean,
					nonfoil: Boolean,
					oversized: Boolean,
					promo: Boolean,
					reprint: Boolean,
					set: String,
					set_name: String,
					set_uri:
					 String,
					set_search_uri:
					 String,
					scryfall_set_uri: String,
					rulings_uri:
					 String,
					prints_search_uri:
					 String,
					collector_number: String,
					digital: Boolean,
					rarity: String,
					flavor_text:
					 String,
					illustration_id: { type: String, unique: true, lowercase: false },
					artist: String,
					border_color: String,
					frame: String,
					frame_effect: String,
					full_art: Boolean,
					story_spotlight: Boolean,
					edhrec_rank: Number,
					related_uris:
					 { gatherer:
							String,
						 tcgplayer_decks:
							String,
						 edhrec: String,
						 mtgtop8:
							String }
				}]
})

//create the model class
const Deck = mongoose.model('Deck', deckSchema);

//export the model
module.exports = Deck;
