//========================================================
//===================    INDEX    ========================
//========================================================

exports.index = (req, res, next) => {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log("ip: " + req.ip);
	res.render('index', {
		title: 'DSL-Comet',
		user: ''
	});
}
