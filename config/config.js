//========================================================
//================     CONFIG     ========================
//========================================================

const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const cors = require('cors');

module.exports = function(app, envConfig){

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  //const csrfProtection = csrf();

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
    collection: 'sessions',
    clear_interval: 10080
  })

  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 },
      store: store
    })
  );
  //app.use(csrfProtection);
  app.use(flash());

};
