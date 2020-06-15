const bcrypt = require('bcryptjs');
var util = require('../config/util');

const User = require('../models/user');
const Session = require('../models/session');

const initSession = async (userId) => {
  const token = await Session.generateToken();
  const session = new Session({ token, userId });
  await session.save();
  return session;
};

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

      const session = await initSession(userId);

      res.cookie('token', session.token, {
        httpOnly: true,
        sameSite: true,
        maxAge : 1209600000, // 2 weeks
        secure: process.env.NODE_ENV === 'production',
      });

  		res.render('index', { title: 'DSL-Comet', user:user.user, connected:true });
    } catch (err) {
      res.render('error');
    }
  },
  loginApp: async (req,res) => {
    console.log("POST /loginApp");
    console.log(req.body.username);
    try {
      const user = await User.findOne({user:req.body.username});
      if (!user) {
        throw new Error();
      }
      console.log("User found");
      console.log(user);

      // compare the passwords
      const passwordValidated = await bcrypt.compare(req.body.password, user.password);
      if (!passwordValidated) {
        throw new Error();
      }
      console.log("User logged in properly");
      util.sendJsonResponse(res, {code:200, msg:"User logged in properly"});
    } catch (err) {
      util.sendJsonError(res, {code:300, msg:err});
    }
  }
};
