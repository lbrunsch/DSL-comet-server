var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/signin', signinRouter);
//app.use('/signin/login', signinRouter);
app.use('/signup', signupRouter);
app.use('/signup/register', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Parameters
var username;
var password;
process.argv.forEach(function (val, index, array) {

  if(index == 2){ //Username
  	username = val;
  }else if(index == 3){ //Password
  	password = val
  }
});

//========================================================
//===============   Auxiliar functions   =================
//========================================================


function sendJsonResponse(res, element){
	//console.log("en sendJsonResponse. Element = " + element);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify({code: "200", array:element}));
}

function sendJsonError(res, text){
	//console.log("En sendJsonError. Text = "+ text);
	res.setHeader("Content-Type", "application/json");
  console.log(text);
	res.send(JSON.stringify({error: text}));
}

function endResponse(res){
	res.end();
}

//========================================================
//=================    LOGIN CONTROLLER   ================
//========================================================
//Add a new user
app.post("/register", function(req, res){
	//a partir del ? vienen los parámetros
	console.log("POST /register");

	//var json = JSON.parse(req.body);
	console.log(req.body);
	console.log("name: "+req.body.name);
	console.log("lastname: "+ req.body.lastname);
	console.log("email: "+req.body.email);

	var name = req.body.name;
	var lastname = req.body.lastname;
	var email = req.body.email;

  var username = req.body.username;
  //TODO: Encriptar
	var password = req.body.password;
  var role = req.body.role;

	//var decodedImage = new Buffer(imageData, 'base64').toString('binary');

	if(user != null) {
		var newUser = User({
			name: name,
			lastname: lastname,
			email : email,
			user : username,
			password:password,
      role:role
			//previewImage : {data : imageData, contentType :"image/png"}
		});

		newUser.save(function(err){
			if(err){
				console.log("Adding error: " + err);
				sendJsonError(res, {code:300, msg:err});
			}else{
				console.log("User added");
				//todo bien, devolvemos añadido correctamente
				//if(req.query.json === "true"){
					sendJsonResponse(res, {code:200, msg:"User added properly"});
				//}else{
					//res.redirect("");
					//endResponse(res);
				//}
			}
		});
	}else{
		endResponse(res);
	}

});

//LOGIN
app.post("/login", function(req,res){
	console.log("POST /login");

  console.log(req.body.user);

	User.findOne({user:req.body.user}, function(err, user){
    if(err){
      console.log("Adding error: " + err);
      sendJsonError(res, {code:300, msg:err});
    }else{
      console.log("User found");
      console.log(user);
      //todo bien, comprobamos pass
      if(user && req.body.password == user.password){
        sendJsonResponse(res, {role:user.role, msg:"User logged in properly"});
      }else{
        //res.redirect("");
        endResponse(res);
      }
    }

  });
});


//========================================================
//================    MONGOOSE    ========================
//========================================================


//Connection events
//mongoose.connection.once("open", function(){
//	console.log("We're connected! Start listening...");
//});

//mongoose.connection.on("error", function(err){
//	console.log("Error");
//	mongoose.connection.close();
//	process.exit(1);
//});


//mongoose.connection.on("disconnected", function(){
//	console.log("Mongoose disconnected");
//	mongoose.connection.close();
//});

var str = "mongodb://" +username+":"+password + "@ds115546.mlab.com:15546/diagrameditor";

//var options = {authMechanism: 'ScramSHA1'};

//var mongooseUri = uriUtil.formatMongoose(str);

mongoose.connect(str, function(err){
	if(err){
		console.log("Error: "+ err);
	}
});

module.exports = app;
