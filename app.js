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

var options = {authMechanism: 'ScramSHA1'};

var mongooseUri = uriUtil.formatMongoose(str);

mongoose.connect(mongooseUri, options, function(err){
	if(err){
		console.log("Error: "+ err);
	}
});

module.exports = app;
