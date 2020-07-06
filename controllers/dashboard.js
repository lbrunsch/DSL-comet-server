//========================================================
//====================   Dashboard   =====================
//========================================================

var util = require('../config/util');

const Ecore = require('../models/ecore');
const Palette = require('../models/palette');
const UserRoleDSL = require('../models/userRoleDSL');
const Json = require('../models/json');
const Role = require('../models/role');

function dashboard (req, res) {
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

exports.get_Dashboard= (req, res) => {
	dashboard(req, res);
}

exports.get_ManageEcore= (req,res,next) => {
	console.log("GET /dashboard/" + req.params.ename);


	Ecore.findOne({name:req.params.ename}, function(err, ecore){

		if(err){
			util.endResponse(res);
		}else{
			if(ecore != null){
				var author;
				if(ecore.author) {
					author = ecore.author;
				} else {
					author = '-';
				}

				Palette.find({ecoreURI:ecore.URI}, function(err, palettes) {
					if(err){
						util.endResponse(res);
					}else{
						var printPalette;
						if(palettes.length == 0) {
							printPalette = false;
						} else {
							printPalette = true;
						}

						UserRoleDSL.findOne({ecoreURI:ecore.URI}, function(err, roles) {
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
									name:ecore.name,
									author:author,
									content:ecore.content,
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

exports.post_DeleteEcore = (req, res, next) => {
	var ecoreURI;
	Ecore.findOne({name:req.params.ename}, async (err, ecore) => {
		ecoreURI = await ecore.URI;
		Ecore.deleteOne({name:req.params.ename}, function (err) {
		  if(err) console.log(err);
		  console.log("Successful deletion ecore");
			Json.deleteOne({URI: ecoreURI}, function(err) {
				if(err) console.log(err);
			  console.log("Successful deletion JSON");
				Palette.deleteMany({ecoreURI: ecoreURI}, function(err) {
					if(err) console.log(err);
				  console.log("Successful deletion palettes");
					Role.deleteMany({ecoreURI: ecoreURI}, function(err) {
						if(err) console.log(err);
					  console.log("Successful deletion roles");
						UserRoleDSL.deleteMany({ecoreURI: ecoreURI}, function(err) {
							if(err) console.log(err);
						  console.log("Successful deletion user role dsl");
							dashboard(req, res);
						});
					});
				});
			});
		});
	});
}

exports.post_DeletePalettes = (req, res, next) => {
	Ecore.findOne({name:req.params.ename}, function(err, ecore){
		if(err) {
			console.log("Error: "+ err);
		} else {
			var author;
			if(ecore.author) {
				author = ecore.author;
			} else {
				author = '-';
			}
			Palette.deleteMany({ ecoreURI: ecore.URI }, function (err) {
			  if(err) console.log(err);
			  console.log("Successful deletion");
				var printPalette = false;
				UserRoleDSL.findOne({ecoreURI:ecore.URI}, function(err, roles) {
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
							name:ecore.name,
							author:author,
							content:ecore.content,
							printPalette:printPalette,
							printRole: printRole,
							hierarchy: hierarchy
						});
					}
				});
			});
		}
	});
}

exports.post_DeleteRoles = (req, res, next) => {
	Ecore.findOne({name:req.params.ename}, function(err, ecore){

		if(err){
			util.endResponse(res);
		}else{
			if(ecore != null){
				var author;
				if(ecore.author) {
					author = ecore.author;
				} else {
					author = '-';
				}

				Palette.find({ecoreURI:ecore.URI}, function(err, palettes) {
					if(err){
						util.endResponse(res);
					}else{
						var printPalette;
						if(palettes.length == 0) {
							printPalette = false;
						} else {
							printPalette = true;
						}
						Role.deleteMany({ecoreURI:ecore.URI}, function(err) {
							if(err) console.log(err);
						  console.log("Successful deletion roles");
							UserRoleDSL.deleteOne({ecoreURI:ecore.URI}, function(err) {
								if(err) {
									console.log(err);
								} else {
									console.log("Successful deletion");
									var printRole = false;
									var hierarchy = '';
									res.render("dashboard/ecoreManagement",{
										name:ecore.name,
										author:author,
										content:ecore.content,
										printPalette:printPalette,
										nbOfPalette: palettes.length,
										paletteList:palettes,
										printRole: printRole,
										hierarchy: hierarchy
									});
								}
							});
						});
					}
				});
			}
		}
	});
}
