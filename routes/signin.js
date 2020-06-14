const bcrypt = require('bcryptjs');
var util = require('../config/util');

const User = require('../models/user');

module.exports = {
  displayForm: function(req, res, next) {
    res.render('signin', { title: 'DSL-Comet::Sign In' });
  },
  loginOld: function(req,res){
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
          util.endResponse(res);
        }
      }

    });
  },
  login: async (req,res) => {
    console.log("POST /login");
    console.log(req.body.username);
    try {
      const user = await User.findOne({user:req.body.username});
      if (!user) {
        throw new Error();
      }
      console.log("User found");
      console.log(user);

      const userId = user._id;

      // compare the passwords
      const passwordValidated = await bcrypt.compare(req.body.password, user.password);
      if (!passwordValidated) {
        throw new Error();
      }
      console.log("User logged in properly");
      util.sendJsonResponse(res, {code:200, msg:"User logged in properly"});

      res.cookie('token', session.token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1209600000,
        secure: process.env.NODE_ENV === 'production',
      });
    } catch (err) {
      util.sendJsonError(res, {code:300, msg:err});
    }
  }
};
