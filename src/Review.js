const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Account = require('./Account');

const ReviewSchema = new mongoose.Schema({
	storeName: {type: String, required: true},
	review: {type: String, required: true},
	rating: {type: Number, required: true},
	user: { type: Schema.Types.ObjectId, ref: 'Account'}
});