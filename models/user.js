const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//define our model
const userSchema = new Schema({
	firstname: { type: String, unique: false, lowercase: false },
	lastname: {  type: String, unique: false, lowercase: false },
	email: { type: String, unique: true, lowercase: true },
	password: String,
	decks: [{
		deck_name: String,
		deck: [{
					name: String,
					number: Number,
					info: {
					object: String,
					id: { type: String, unique: false, lowercase: false},
					oracle_id: { type: String, unique: false, lowercase: false},
					multiverse_ids: [],
					mtgo_id: { type: Number, unique: false, lowercase: false},
					mtgo_foil_id: { type: Number, unique: false, lowercase: false},
					arena_id: { type: Number, unique: false, lowercase: false},
					tcgplayer_id: { type: Number, unique: false, lowercase: false},
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
					illustration_id: { type: String, unique: false, lowercase: false },
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
				}
}]}
		]
});

//on Save Hook, encrypt password
//before saving a model run this function
userSchema.pre('save', function(next) {
	const user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if (err) { return next(err); }

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) { return next(err); }

			user.password = hash;
			next();
		})
	})

});

	userSchema.methods.comparePassword = function(candidatePassword, callback) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
			if(err) { return callback(err); }

			callback(null, isMatch);
		});
	}

//set unique deck and email
// userSchema.index({ email: 1, deck_name: 1}, { unique: true });

//create the model class
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;
