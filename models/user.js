//========================================================
//========================    User   =====================
//========================================================

var mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
    minlength: 1,
		trim: true,
		unique:true
	},
  user: {
		type:String,
		required:true,
		trim: true,
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
	},
	roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
});

//make sure the emails are uniqueValidator
UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function(next) {
	let user = this;

	if (!user.isModified('password')) {
		return next();
	}

bcrypt.genSalt(12).then((salt) => {
	return bcrypt.hash(user.password, salt);
}).then((hash) => {
	user.password = hash;
	next();
}).catch((err) => next(err));
});

User = mongoose.model("User", UserSchema);
module.exports = User;
