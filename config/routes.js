var express = require('express');

module.exports = function(app){

  var main = require('../routes/main');
  //var usersRouter = require('../routes/users');
  var signin = require('../routes/signin');
  var signup = require('../routes/signup');

  var signinRouter = express.Router();
  var signupRouter = express.Router();

  app.use('/signin', signinRouter);
  app.use('/signup', signupRouter);

  app.get('/', main.index);
  signinRouter.get('/', signin.displayForm);
  signinRouter.post('/login', signin.login);
  signupRouter.get('/', signup.displayForm);
  signupRouter.post('/register', signup.register);


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
};
