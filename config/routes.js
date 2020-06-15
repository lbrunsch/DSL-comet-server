var express = require('express');
const { authenticate } = require('../middleware/authenticate');

module.exports = function(app){

  var main = require('../routes/main');
  //var usersRouter = require('../routes/users');
  var signin = require('../routes/signin');
  var signup = require('../routes/signup');
  var palettes = require('../routes/palettes');
  var ecores = require('../routes/ecores');
  var json = require('../routes/json');
  var diagrams = require('../routes/diagrams');

  var signinRouter = express.Router();
  var signupRouter = express.Router();
  var palettesRouter = express.Router();
  var ecoresRouter = express.Router();
  var jsonRouter = express.Router();
  var diagramsRouter = express.Router();

  app.use('/signin', signinRouter);
  app.use('/signup', signupRouter);
  app.use('/palettes', palettesRouter);
  app.use('/ecores', ecoresRouter);
  app.use('/jsons', jsonRouter);
  app.use('/diagrams', diagramsRouter);

  app.get('/', authenticate,  main.index);
  signinRouter.get('/', signin.displayForm);
  signinRouter.post('/login', signin.login);
  signinRouter.post('/loginApp', signin.loginApp);
  signupRouter.get('/', signup.displayForm);
  signupRouter.post('/register', signup.register);
  signupRouter.post('/registerApp', signup.registerApp);
  palettesRouter.get('/', authenticate, palettes.showPalettesList);
  palettesRouter.post('/', palettes.addNewPalette);
  palettesRouter.get('/:pname', palettes.getPalette);
  palettesRouter.post('/:pname/delete', palettes.removePalette);
  palettesRouter.put('/:pname', palettes.updatePalette);
  ecoresRouter.get('/', authenticate, ecores.showEcoreList);
  ecoresRouter.post('/', ecores.addEcore);
  ecoresRouter.get('/:ename', ecores.getEcore);
  ecoresRouter.post('/:ename/delete', ecores.removeEcore);
  jsonRouter.get('/', json.json);
  jsonRouter.get('/:name', json.getJson);
  app.get('/jsonbyuri', json.jsonByUri);
  diagramsRouter.get('/', diagrams.showDiagramsList);
  diagramsRouter.post('/', diagrams.addNewDiagram);
  diagramsRouter.get('/:dname', diagrams.getDiagram);
  diagramsRouter.get('/:dname/image', diagrams.getDiagramImage);
  diagramsRouter.delete('/:dname', diagrams.removeDiagram);
  diagramsRouter.put(':dname', diagrams.updateDiagram);
  app.get('/logout', authenticate,  main.logOut);

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
