//========================================================
//====================     eCores    =====================
//========================================================

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ecoreSchema = new Schema({
	name: {
		type:String,
		required:true
	},
	content: {
		type:String
	},
	URI:{
		type:String,
		unique:true,
		required:true
	},
	author: {
		type:String
	}
});



Ecore = mongoose.model("Ecore", ecoreSchema);
module.exports = Ecore;
