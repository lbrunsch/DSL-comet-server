var mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		type:String,
		required:true,
		unique:false
	},
  lastname: {
		type:String,
		required:true,
		unique:false
	},
  email: {
		type:String,
		required:true,
		unique:true
	},
  user: {
		type:String,
		required:true,
		unique:true
	},
  password: {
		type:String,
		required:true,
		unique:false
	},
  role: {
		type:String,
		required:true,
		unique:false
	}
});

//make sure the emails are uniqueValidator
//userSchema.plugin(uniqueValidator);

//userSchema.pre("save", function(next) {
//	let user = this;

//	if (!user.isModified('password')) {
//		return next();
//	}

//bcrypt.genSalt(12).then((salt) => {
//	return bcrypt.hash(user.password, salt);
//}).then((hash) => {
//	user.password = hash;
//	next();
//}).catch((err) => next(err));
//});

User = mongoose.model("User", userSchema);
module.exports = User;
