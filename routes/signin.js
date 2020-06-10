var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Session = require('../models/session');

const { authenticate } = require('../middleware/authenticate');

/* GET signin page. */
router.get('/', function(req, res, next) {
  res.render('signin', { title: 'DSL-Comet::Sign In' });
});

//========================================================
//================       LOGIN       =====================
//========================================================

router.post("/login", function(req,res){
	console.log("POST /login");

  console.log(req.body.username);

	User.findOne({username:req.body.username}, function(err, user){
    if(err){
      console.log("Adding error: " + err);
      sendJsonError(res, {code:300, msg:err});
    }else{
      console.log("User found");
      console.log(user);
      //todo bien, comprobamos pass
      if(user && req.body.password == user.password){
        console.log("User logged in properly");
      }else{
        //res.redirect("");
        res.end();
      }
    }

  });
});

module.exports = router;
