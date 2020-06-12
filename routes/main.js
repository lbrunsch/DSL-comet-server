module.exports = {
	index: function(req, res) {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log("ip: " + req.ip)
		res.render('index', { title: 'DSL-Comet' });
	}
}
