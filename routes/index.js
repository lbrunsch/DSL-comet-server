var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'DSL-Comet' });
//});

router.get('/', function(req, res) {
	console.log("/");
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log("ip: " + req.ip)
	res.render('index', { title: 'DSL-Comet' });
	//endResponse(res);
});

module.exports = router;
