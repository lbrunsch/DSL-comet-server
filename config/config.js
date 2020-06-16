var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

module.exports = function(app, envConfig){
    // view engine setup
    app.set('views', path.join(envConfig.rootPath, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon(envConfig.rootPath + '/public/images/favicon.ico'));
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    // telling Express to serve static objects from the /public/ dir, but make it seem like the top level
    app.use(express.static(path.join(envConfig.rootPath, 'public')));

    const store = new MongoDBStore({
      uri: envConfig.database,
      collection: 'sessions'
    })

    app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

  
};
