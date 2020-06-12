var util = require('../config/util');

var User = require('../models/user');

module.exports = {
  displayForm: function(req, res, next) {
    res.render('signup', { title: 'DSL-Comet::Sign Up' });
  },
  register: function(req, res){
  	console.log("POST /register");
  	console.log(req.body);

  	var name = req.body.name;
  	var lastname = req.body.lastname;
  	var email = req.body.email;

    var username = req.body.username;
    //TODO: Encriptar
  	var password = req.body.password;

    var role = "editor";

  	if(username != null) {
  		var newUser = User({
  			name: name,
  			lastname: lastname,
  			email: email,
  			user: username,
  			password:password,
        role: role
  		});

  		newUser.save(function(err){
  			if(err){
  				console.log("Adding error: " + err);
          util.sendJsonError(res, {code:300, msg:err});
  			}else{
  				console.log("User added");
            util.sendJsonResponse(res, {code:200, msg:"User added properly"});
  			}
  		});
  	}else{
  		util.endResponse(res);
  	}

  }
};
