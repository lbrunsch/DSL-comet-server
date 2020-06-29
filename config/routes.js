//========================================================
//================     ROUTES     ========================
//========================================================

var express = require('express');
const csrf = require('csurf');
const flash = require('connect-flash');

const authenticate = require('../middleware/is-auth');
const errorController = require('../controllers/error');
const indexController = require('../controllers/index');

const authRoutes = require('../routes/auth');
const palettesRoutes = require('../routes/palettes');
const ecoresRoutes = require('../routes/ecores');
const jsonRoutes = require('../routes/json');
const diagramsRoutes = require('../routes/diagrams');
const dashboardRoutes = require('../routes/dashboard');

const User = require('../models/user');

module.exports = function(app){

  app.use((req, res, next) => {
    console.log('apptest 1');
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

  app.use((req, res, next) => {
    console.log('apptest 2');
    const username = req.session.username;
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.username = username;
    res.locals.roleOnWeb = req.sessions.roleOnWeb;
    //res.locals.csrfToken = req.csrfToken();
    next();
  });

  // main page
  app.get('/', indexController.index);
  // other routes
  app.use(authRoutes);
  app.use(palettesRoutes);
  app.use(ecoresRoutes);
  app.use(jsonRoutes);
  app.use(diagramsRoutes);
  // Creator
  app.use(dashboardRoutes);
  // catch 404 and forward to error handler
  app.use(errorController.get404);

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('errors/error');
  });
};
