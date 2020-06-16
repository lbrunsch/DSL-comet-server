//========================================================
//====================    sign in    =====================
//========================================================

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var util = require('../config/util');

const User = require('../models/user');
//const Session = require('../models/session');

exports.displayForm = (req, res, next) => {
  //res.render('signin', { title: 'DSL-Comet::Sign In' });
  res.render('signin', {
    //path: '/login',
    title: 'DSL-Comet::Sign In',
  })
};

exports.login = (req, res) => {
  console.log("POST /login");
  console.log(req.body);
  User.findOne({user:req.body.username})
  .then(user => {
    if(!user) {
      //return res.status(401).json({ error: 'User not found!' });
      return res.redirect('/signin');
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid =>{
        if(!valid) {
          //return res.status(401).json({ error: 'Password is not correct!' });
          res.redirect('/login');
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log(err);
          res.redirect('/');
        })
        // console.log("User logged in properly: "+ user);
        // res.status(200).json({
        //   userId: user._id,
        //   token: jwt.sign(
        //     { userId: user._id },
        //     'RANDOM_TOKEN_SECRET',
        //     { expiresIn: '24h' }
        //   )
        // });
        //res.render('index', { title: 'DSL-Comet', user:user.user, connected:true });
      }).catch(error => {
        console.log(err);
        res.redirect('/login');
      });
  }).catch(error => console.log(err));
};

exports.loginApp = async (req, res) => {
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
//     res.render('signin', { title: 'DSL-Comet::Sign In' });
//   },
//   loginOld: function(req,res){
//   	console.log("POST /login");
//
//     console.log(req.body.username);
//
//   	User.findOne({user:req.body.username}, function(err, user){
//       if(err){
//         console.log("Adding error: " + err);
//         util.sendJsonError(res, {code:300, msg:err});
//       }else{
//         console.log("User found");
//         console.log(user);
//         //todo bien, comprobamos pass
//         if(user && req.body.password == user.password){
//           console.log("User logged in properly");
//         }else{
//           //res.redirect("");
//           util.endResponse(res);
//         }
//       }
//
//     });
//   },
//   login: async (req,res) => {
//     User.findOne({user:req.body.username})
//     .then(user => {
//       if(!user) {
//         return res.status(401).json({ error: 'User not found!' });
//       }
//       bcrypt.compare(req.body.password, user.password)
//         .then(valid =>{
//           if(!valid) {
//             return res.status(401).json({ error: 'Password is not correct!' });
//           }
//           console.log("User logged in properly: "+ user);
//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign(
//               { userId: user._id },
//               'RANDOM_TOKEN_SECRET',
//               { expiresIn: '24h' }
//             )
//           });
//           //res.render('index', { title: 'DSL-Comet', user:user.user, connected:true });
//         }).catch(error => res.status(500).json({ error }));
//     }).catch(error => res.status(500).json({ error }));
//   },
//   loginApp: async (req,res) => {
//     console.log("POST /loginApp");
//     console.log(req.body.username);
//     try {
//       const user = await User.findOne({user:req.body.username});
//       if (!user) {
//         throw new Error();
//       }
//       console.log("User found");
//       console.log(user);
//
//       // compare the passwords
//       const passwordValidated = await bcrypt.compare(req.body.password, user.password);
//       if (!passwordValidated) {
//         throw new Error();
//       }
//       console.log("User logged in properly");
//       util.sendJsonResponse(res, {code:200, msg:"User logged in properly"});
//     } catch (err) {
//       util.sendJsonError(res, {code:300, msg:err});
//     }
//   }
// };
