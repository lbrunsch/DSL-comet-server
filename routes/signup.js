//========================================================
//====================    sign up    =====================
//========================================================

const bcrypt = require('bcryptjs');
var util = require('../config/util');

var User = require('../models/user');
//const Session = require('../models/session');

exports.displayForm = (req, res, next) => {
  res.render('signup', { title: 'DSL-Comet::Sign Up' });
};

exports.register = async (req, res) => {
  console.log("POST /register");
  console.log(req.body);
  // const user = new User({
  //   name: req.body.name,
  //   lastname: req.body.lastname,
  //   email: req.body.email,
  //   user: req.body.username,
  //   password: req.body.password,
  //   role: 'editor'
  // });
  User.findOne({ user: req.body.username })
    .then(userExist => {
      if (userExist) {
        return res.redirect('/signup');
      }
      const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        user: req.body.username,
        password: req.body.password,
        role: 'editor'
      });
      user.save();
      res.redirect('/signin');
    }).catch(err => {
      console.log(err);
    });
  // user.save()
  //   .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
  //   .catch(error => res.status(400).json({ error }));
  //res.render('index', { title: 'DSL-Comet', user:newUser.user, connected:true });
};

exports.registerApp = async (req, res) => {
  console.log("POST /registerApp");
  console.log(req.body);
  try {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    if(req.body.role != null) {
      var role = req.body.role;
    } else {
      var role = "editor";
    }

    var newUser = User({
      name: name,
      lastname: lastname,
      email: email,
      user: username,
      password:password,
      role: role
    });
    const persistedUser = await newUser.save();
    util.sendJsonResponse(res, {code:200, msg:"User added properly"});
  } catch (err) {
    util.sendJsonError(res, {code:300, msg:err});
  }

};



// const initSession = async (userId) => {
//   const token = await Session.generateToken();
//   const session = new Session({ token, userId });
//   await session.save();
//   return session;
// };
//
// module.exports = {
//   displayForm: function(req, res, next) {
//     res.render('signup', { title: 'DSL-Comet::Sign Up' });
//   },
//   registerOld: function(req, res){
//   	console.log("POST /register");
//   	console.log(req.body);
//
//   	var name = req.body.name;
//   	var lastname = req.body.lastname;
//   	var email = req.body.email;
//
//     var username = req.body.username;
//     //TODO: Encriptar
//   	var password = req.body.password;
//
//     var role = "editor";
//
//   	if(username != null) {
//   		var newUser = User({
//   			name: name,
//   			lastname: lastname,
//   			email: email,
//   			user: username,
//   			password:password,
//         role: role
//   		});
//
//   		newUser.save(function(err){
//   			if(err){
//   				console.log("Adding error: " + err);
//           util.sendJsonError(res, {code:300, msg:err});
//   			}else{
//   				console.log("User added");
//             util.sendJsonResponse(res, {code:200, msg:"User added properly"});
//   			}
//   		});
//   	}else{
//   		util.endResponse(res);
//   	}
//
//   },
//   register: async (req, res) => {
//     console.log("POST /register");
//   	console.log(req.body);
//     try {
//       var name = req.body.name;
//     	var lastname = req.body.lastname;
//     	var email = req.body.email;
//       var username = req.body.username;
//     	var password = req.body.password;
//       if(req.body.role != null) {
//         var role = req.body.role;
//       } else {
//         var role = "editor";
//       }
//
//       var newUser = User({
//   			name: name,
//   			lastname: lastname,
//   			email: email,
//   			user: username,
//   			password:password,
//         role: role
//   		});
//       const persistedUser = await newUser.save();
//
//       const userId = persistedUser._id;
//       const session = await initSession(userId);
//       res.cookie('token', session.token, {
//         httpOnly: true,
//         sameSite: true,
//         maxAge : 1209600000, // 2 weeks
//         secure: process.env.NODE_ENV === 'production',
//       });
//
//       res.render('index', { title: 'DSL-Comet', user:newUser.user, connected:true });
//     } catch (err) {
//       res.render('error');
//     }
//
//   },
//   registerApp: async (req, res) => {
//     console.log("POST /registerApp");
//   	console.log(req.body);
//     try {
//       var name = req.body.name;
//     	var lastname = req.body.lastname;
//     	var email = req.body.email;
//       var username = req.body.username;
//     	var password = req.body.password;
//       if(req.body.role != null) {
//         var role = req.body.role;
//       } else {
//         var role = "editor";
//       }
//
//       var newUser = User({
//   			name: name,
//   			lastname: lastname,
//   			email: email,
//   			user: username,
//   			password:password,
//         role: role
//   		});
//       const persistedUser = await newUser.save();
//       util.sendJsonResponse(res, {code:200, msg:"User added properly"});
//     } catch (err) {
//       util.sendJsonError(res, {code:300, msg:err});
//     }
//
//   }
// };
