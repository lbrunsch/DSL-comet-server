var mongoose = require("mongoose");

const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;


// var Schema = mongoose.Schema;
//
// var roleSchema = new Schema({
// 	name: {
// 		type:String,
// 		required:true,
// 		unique:true
// 	},
// 	canEcore:{
// 		type:Boolean,
//     required:true
// 	},
//   canSave:{
// 		type:Boolean,
//     required:true
// 	},
//   canEdit:{
// 		type:Boolean,
//     required:true
// 	}
// });
//
// Role = mongoose.model("Role", roleSchema);
// module.exports = Role;
