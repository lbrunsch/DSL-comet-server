var util = require('../config/util');

var User = require('../models/user');
const Session = require('../models/session');

module.exports = {
	indexOld: function(req, res) {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log("ip: " + req.ip);
		res.render('index', { title: 'DSL-Comet' });
	},
	index: async (req, res) => {
		try {
			var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			console.log("ip: " + req.ip);

			if (req.session != null) {
				console.log("coucou");
				const { userId } = req.session;
				console.log("index user id : "+ userId);

				if(userId) {
		    	const user = await User.findById({ _id: userId });

						console.log("bouh "+ user);
					res.render('index', { title: 'DSL-Comet', user: user.user, connected: true });
				} else {
					console.log("OH NO");
					res.render('index', { title: 'DSL-Comet', user:'', connected: false });
				}
			} else {
					console.log("OH NOoodoododod");
				res.render('index', { title: 'DSL-Comet', user:'', connected: false });
			}
		} catch (err) {
			util.sendJsonError(res, {code:300, msg:err});
		}
	},
	logOut: async (req, res) => {
		try {
			Session.updateOne(req.session, { status: 'expired' });
			res.clearCookie('token');
			res.render('index', { title: 'DSL-Comet', user:'', connected:false });
		} catch (err) {
	    res.status(401).json({
	      errors: [
	        {
	          title: 'Unauthorized',
	          detail: 'Not authorized to acces this route.',
	          errorMessage: err.message,
	        },
	      ],
	    });
	  }
	}
}
