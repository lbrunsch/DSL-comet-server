var util = require('../config/util');

const User = require('../models/user');

module.exports = {
  displayForm: function(req, res, next) {
    res.render('signin', { title: 'DSL-Comet::Sign In' });
  },
  login: function(req,res){
  	console.log("POST /login");

    console.log(req.body.username);

  	User.findOne({user:req.body.username}, function(err, user){
      if(err){
        console.log("Adding error: " + err);
        util.sendJsonError(res, {code:300, msg:err});
      }else{
        console.log("User found");
        console.log(user);
        //todo bien, comprobamos pass
        if(user && req.body.password == user.password){
          console.log("User logged in properly");
        }else{
          //res.redirect("");
          console.log("looooool");
          util.endResponse(res);
        }
      }

    });
  }
};
