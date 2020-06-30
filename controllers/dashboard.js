const Ecore = require('../models/ecore');

exports.get_Dashboard= (req, res, next) => {
	res.render("dashboard/dashboard", {
		title: 'DSL-Comet::Dashboard'
	});
}

exports.get_ShowEcoreList= (req, res) => {
	var role = res.locals.roleOnWeb;
	if(role == 'admin') {
		Ecore.find({}, async (err, ecores) => {
			try {
				res.render("dashboard/dashboard",{
					ecorelist:ecores
				 });
			}catch (err){
				console.log("Error: "+err);
			}
		});
	} else if (role == 'author'){
		console.log("lol3");
		Ecore.find({author: res.locals.username}, async (err, ecores) => {
			console.log("lol31");
			try {
				res.render("dashboard/dashboard",{
					ecorelist:ecores
				 });
			}catch (err){
				console.log("Error: "+err);
			}
		});
	}
}

// exports.get_ShowEcoreListAdmin= (req, res) => {
// 		Ecore.find({}, async (err, ecores) => {
// 			try {
// 				if(req.query.json ==="true"){
// 					util.sendJsonResponse(res, ecores);
// 				} else{
// 				res.render("dashboard/dashboard",{
// 					ecorelist:ecores
// 				 });
// 			 }
// 			}catch (err){
// 				console.log("Error: "+err);
// 			}
// 		});
// }
//
// exports.get_ShowEcoreListAuthor= (req, res) => {
// 		Ecore.find({author: res.locals.username}, async (err, ecores) => {
// 			try {
// 				res.render("dashboard/dashboard",{
// 					ecorelist:ecores
// 				 });
// 			}catch (err){
// 				console.log("Error: "+err);
// 			}
// 		});
// }
