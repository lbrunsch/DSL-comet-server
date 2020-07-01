var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userRoleDSLSchema = new Schema({
  roles:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    unique:true
  }],
	ecoreURI:{
		type:String,
		required:true,
		unique:true
	},
	content:{
		type:String
	},
	extension:{
		type:String
	}
});

UserRoleDSL = mongoose.model("UserRoleDSL", userRoleDSLSchema);
module.exports = UserRoleDSL;
