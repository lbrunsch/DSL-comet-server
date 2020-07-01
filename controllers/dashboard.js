//========================================================
//====================   Dashboard   =====================
//========================================================

var util = require('../config/util');

const Ecore = require('../models/ecore');
const Palette = require('../models/palette');
const UserRoleDSL = require('../models/userRoleDSL');

exports.get_Dashboard= (req, res) => {
	var role = res.locals.roleOnWeb;
	if(role == 'admin') {
		Ecore.find({}, async (err, ecores) => {
			try {
				res.render("dashboard/dashboard",{
					title: 'DSL-Comet::Dashboard',
					ecorelist:ecores
				 });
			}catch (err){
				console.log("Error: "+err);
			}
		});
	} else if (role == 'author'){
		Ecore.find({author: res.locals.username}, async (err, ecores) => {
			try {
				res.render("dashboard/dashboard",{
					title: 'DSL-Comet::Dashboard',
					ecorelist:ecores
				 });
			}catch (err){
				console.log("Error: "+err);
			}
		});
	}
}

exports.get_ManageEcore= (req,res,next) => {
	console.log("GET /dashboard/" + req.params.ename);


	Ecore.findOne({name:req.params.ename}, function(err, ec){

		if(err){
			util.endResponse(res);
		}else{
			if(ec != null){
				var author;
				if(ec.author) {
					author = ec.author;
				} else {
					author = '-';
				}

				Palette.find({ecoreURI:ec.URI}, function(err, palettes) {
					if(err){
						util.endResponse(res);
					}else{
						var printPalette;
						if(palettes.length == 0) {
							printPalette = false;
						} else {
							printPalette = true;
						}

						UserRoleDSL.findOne({ecoreURI:ec.URI}, function(err, roles) {
							if(err) {
								util.endResponse(res);
							} else {
								var printRole;
								var hierarchy;
								if(roles) {
									printRole = true;
									hierarchy = roles.content;
								} else {
									printRole = false;
									hierarchy = '';
								}
								res.render("dashboard/ecoreManagement",{
									name:ec.name,
									author:author,
									content:ec.content,
									printPalette:printPalette,
									nbOfPalette: palettes.length,
									paletteList:palettes,
									printRole: printRole,
									hierarchy: hierarchy
								});
							}
						});
					}
				});
			}
		}
	});
}
