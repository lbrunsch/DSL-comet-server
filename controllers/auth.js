//========================================================
//====================    AUTH    ========================
//========================================================

const bcrypt = require('bcryptjs');

var util = require('../config/util');

var User = require('../models/user');


//====================    sign up    =====================

exports.get_SignUp = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    title: 'DSL-Comet::Sign Up',
    errorMessage: message
  });
};

exports.post_SignUp = (req, res, next) => {
  console.log("POST /signup");
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  // const name = req.body.name;
  // if(name === 'undefined') {
  //   name ='';
  // }
  // const lastname = req.body.lastname;
  // if(lastname === 'undefined') {
  //   lastname ='';
  // }

  User.findOne({ user: username })
    .then(userExist => {
      if (userExist) {
        req.flash('error', 'Username exists already, please pick a different one.');
        return res.redirect('/signup');
      }
      if (username === 'undefined' || username === '') {
        req.flash('error', 'You have to set a username.');
        return res.redirect('/signup');
      }
      User.findOne({ email: email })
        .then(emailExist => {
          if (emailExist) {
            req.flash('error', 'E-Mail exists already, please pick a different one.');
            return res.redirect('/signup');
          }
          if (email === 'undefined' || email === '') {
            req.flash('error', 'You have to set an email.');
            return res.redirect('/signup');
          }
          if(password === 'undefined' || password === '') {
            req.flash('error', 'You have to set a password.');
            return res.redirect('/signup');
          }
          const user = new User({
            name: " ",
            lastname: " ",
            email: email,
            user: username,
            password: password,
            role: 'editor'
          });
          user.save();
          res.redirect('/signin');
        }).catch(err => {
          console.log(err);
        })
    }).catch(err => {
      console.log(err);
    });
};

exports.post_RegisterApp = (req, res, next) => {
  console.log("POST /signup");
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const role = req.body.role;

  User.findOne({ user: username })
    .then(userExist => {
      if (userExist) {
        util.sendJsonError(res, {code:300, msg:err});
      }
      User.findOne({ email: email })
        .then(emailExist => {
          if (emailExist) {
            util.sendJsonError(res, {code:300, msg:err});
          }
          const user = new User({
            name: name,
            lastname: lastname,
            email: email,
            user: username,
            password: password,
            role: role
          });
          user.save();
          util.sendJsonResponse(res, {code:200, msg:"User added properly"});
        }).catch(err => {
          console.log(err);
          util.sendJsonError(res, {code:300, msg:err});
        })
    }).catch(err => {
      console.log(err);
      util.sendJsonError(res, {code:300, msg:err});
    });
};

exports.post_RegisterAppOld = async (req, res) => {
  console.log("POST /register");
  console.log(req.body);
  try {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;

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

//====================    sign in    =====================

exports.get_SignIn = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signin', {
    //path: '/login',
    title: 'DSL-Comet::Sign In',
    errorMessage: message
  })
};

exports.post_SignIn = (req, res, next) => {
  console.log("POST /signin");
  console.log(req.body);
  User.findOne({user:req.body.username})
  .then(user => {
    if(!user) {
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/signin');
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid =>{
        if(!valid) {
          res.redirect('/signin');
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.userRole = user.role;
        req.session.username = req.body.username;
        return req.session.save(err => {
          console.log(err);
          res.redirect('/');
        })
      }).catch(err => {
        console.log(err);
        req.flash('error', 'Invalid username or password.');
        res.redirect('/signin');
      });
  }).catch(err => console.log(err));
};

exports.post_LoginApp = (req, res, next) => {
  console.log("POST /signin");
  console.log(req.body);
  User.findOne({user:req.body.username})
  .then(user => {
    if(!user) {
      util.sendJsonError(res, {code:300, msg:err});
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid =>{
        if(!valid) {
          util.sendJsonError(res, {code:300, msg:err});
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.userRole = user.role;
        req.session.username = req.body.username;
        return req.session.save(err => {
          console.log(err);
          util.sendJsonResponse(res, {code:200, msg:"User logged in properly"});
        })
      }).catch(err => {
        console.log(err);
        util.sendJsonError(res, {code:300, msg:err});
      });
  }).catch(err => {
    util.sendJsonError(res, {code:300, msg:err});
  });
};

exports.post_LoginAppOld = async (req, res) => {
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

//====================    log out    =====================

exports.post_Logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
