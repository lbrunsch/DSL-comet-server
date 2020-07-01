//========================================================
//========================    Role   =====================
//========================================================

const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: {
      type:String,
      unique:true
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    ecoreURI: {
      type:String,
  		required:true,
  		unique:false
    }
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
