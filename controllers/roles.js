const xmldoc = require('xmldoc');

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

  var document = new xmldoc.XmlDocument(content);
  document.eachChild(function (category) {
    console.log(category.attr.name);
  });

  if(uri != null) {
    var username = res.locals.username;
    User.findOne({user:username}, async (err, user) => {
      //var userId = user._id;
      //var userArray = [userId];
      var usernames = [username];
      var admin = Role({
        name: 'Admin',
        //users: userArray,
        usernames: usernames,
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
      await document.eachChild(async (category) => {
        console.log(category.attr.name);
        //if(category.attr.xsi == "UserRoleDSL:Custom") {
        var name = category.attr.name;
        var custom = Role({
          name: name,
          ecoreURI: uri
        });
        await custom.save(function(err){
          if(err) {
            console.log(err);
          }
        });
        //}
      });

      var newUserRoleDSL = UserRoleDSL({
        ecoreURI: uri,
        content: content,
        extension: extension
      });
      await newUserRoleDSL.save(function(err){
        if(err) {
          console.log(err);
        }
      });

      await Role.findOne({name:'Admin'}, function (err, role) {
        UserRoleDSL.findOneAndUpdate({ecoreURI:uri}, {$push:{roles:role._id}});
      });
      await Role.findOne({name:'Guest'}, function (err, role) {
        UserRoleDSL.findOneAndUpdate({ecoreURI:uri}, {$push:{roles:role._id}});
      });
      await document.eachChild(async (category) => {
        var roleName = category.attr.name;
        await Role.findOne({name:roleName}, async (err, role) => {
          await UserRoleDSL.findOneAndUpdate({ecoreURI:uri}, {$push:{roles:role._id}});
        });
      });

      res.redirect("/roles");

      /*Role.findOne({name:'Admin'}, async (err, role) => {
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
      });*/
    });
  }
}

exports.get_ManageRole= (req,res, next) => {
  console.log("GET /roles/" + req.params.ename);

  Ecore.findOne({name:req.params.ename}, function(err, ec){

    if(err){
      console.log(err);
    }else{
      if(ec != null){
        //UserRoleDSL.findOne({ecoreURI:ec.URI}, async(err, hierarchy){

          res.render("roles/manageRole",{
            name:ec.name,
            roles: hierarchy.roles
          });
        //});
      }
    }
  });
}
