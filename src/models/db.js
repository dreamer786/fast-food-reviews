const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const ReviewSchema = new mongoose.Schema({
	storeName: {type: String, required: true},
	borough: {type: String, required:true},
	streetAddress: {type: String, required: true},
	zip: {type: Number, required: true},
	review: {type: String, required: true},
	rating: {type: Number, required: true},
	user: { type: Schema.Types.ObjectId, ref: 'User'}
});

const userSchema = mongoose.Schema({
	local: {username: {type: String, required: true},
			email: {type: String, required: true}, 
			password: {type: String, required: true}
}});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports.User = mongoose.model('User', userSchema);
module.exports.Review = mongoose.model('Review', ReviewSchema);