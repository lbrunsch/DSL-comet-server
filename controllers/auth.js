const bcrypt = require('bcryptjs');
var util = require('../config/util');

var User = require('../models/user');

//========================================================
//====================    sign up    =====================
//========================================================

exports.get_SignUp = (req, res, next) => {
  res.render('signup', { title: 'DSL-Comet::Sign Up' });
};

exports.post_SignUp = (req, res, next) => {
  console.log("POST /signup");
  console.log(req.body);
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
};

exports.post_RegisterApp = async (req, res) => {
  console.log("POST /register");
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

//========================================================
//====================    sign in    =====================
//========================================================

exports.get_SignIn = (req, res, next) => {
  res.render('signin', {
    //path: '/login',
    title: 'DSL-Comet::Sign In',
  })
};

exports.post_SignIn = (req, res, next) => {
  console.log("POST /signin");
  console.log(req.body);
  User.findOne({user:req.body.username})
  .then(user => {
    if(!user) {
      return res.redirect('/signin');
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid =>{
        if(!valid) {
          res.redirect('/signin');
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log(err);
          res.redirect('/');
        })
      }).catch(error => {
        console.log(err);
        res.redirect('/signin');
      });
  }).catch(error => console.log(err));
};

exports.post_LoginApp = async (req, res) => {
  console.log("POST /login");
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

//========================================================
//====================    log out    =====================
//========================================================

exports.post_Logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
