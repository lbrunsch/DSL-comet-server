var util = require('../config/util');

const UserRoleDSL = require('../models/userRoleDSL');
const Role = require('../models/role');
const User = require('../models/user');

exports.get_ShowRole= (req, res, next) => {
  res.render('roles/addRoles', {
    title: 'DSL-Comet::Role'
  });
}

exports.post_AddRole= (req, res, next) => {
  var uri = req.body.ecoreURI;
  var content = req.body.content;
  var extension = req.body.extension;

  if(uri != null) {
    var username = res.locals.username;
    User.findOne({user:username}, async (err, user) => {
      var userId = user._id;
      var userArray = [userId]
      var admin = Role({
        name: 'Admin',
        users: userArray,
        ecoreURI: uri
      });
      await admin.save(function(err){
        if(err) {
          console.log(err);
        }
      });
      var guest = Role({
        name: 'Guest',
        ecoreURI: uri
      });
      await guest.save(function(err){
        if(err) {
          console.log(err);
        }
      });
      Role.findOne({name:'Admin'}, async (err, role) => {
        var adminId = role._id;
        console.log("adminID " + adminId);
        Role.findOne({name:'Guest'}, async (err, role) => {
          var guestId = role._id;
          console.log("guestId " + guestId);
          var roles = [adminId, guestId];
          console.log("roles "+ roles);
          var newUserRoleDSL = UserRoleDSL({
            roles: roles,
            ecoreURI: uri,
            content: content,
            extension: extension
          });
          // newUserRoleDSL.roles.push(admin);
          // newUserRoleDSL.roles.push(guest);
          newUserRoleDSL.save(function(err){
            if(err) {
              console.log(err);
            } else {
              res.redirect("/roles");
              util.endResponse(res);
            }
          });
        });
      });
    });
  }

}
