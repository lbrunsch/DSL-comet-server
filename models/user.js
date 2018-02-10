var mongoose = require("mongoose");
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

User = mongoose.model("User", userSchema);
module.exports = User;
