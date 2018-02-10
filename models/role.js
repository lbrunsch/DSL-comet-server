var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roleSchema = new Schema({
	name: {
		type:String,
		required:true,
		unique:true
	},
	canEcore:{
		type:Boolean,
    required:true
	},
  canSave:{
		type:Boolean,
    required:true
	},
  canEdit:{
		type:Boolean,
    required:true
	}
});

Role = mongoose.model("Role", roleSchema);
module.exports = Role;
