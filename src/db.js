const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;
//User -> Review: 1 -> many
//Review to User: many -> 1
//Store to Review: 1 -> many
const UserSchema = new mongoose.Schema({
	username: {type:String, unique: true, required: true},
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	reviews: [ReviewSchema]
});

const ReviewSchema = new mongoose.Schema({
	storeName: {type: String, required: true},
	review: {type: String, required: true},
	rating: {type: Number, required: true},
	user: { type: Schema.Types.ObjectId, ref: 'User'}
	store: {type:Schema.Types.ObjectId, ref: 'Store'}
});
/*
const Store = new mongoose.Schema({
	name: {type: String, required: true},
	streetAddress: {type: String, required: true},
	borough: {type: String, required: true},
	averageRating: {type: Number},
	reviews: [ReviewSchema]
});
*/
mongoose.model('User', UserSchema);
mongoose.model('Review', ReviewSchema);
//mongoose.model('Store', Store);

UserSchema.plugin(URLSlugs('username email'));
Store.plugin(URLSlugs('name address'));