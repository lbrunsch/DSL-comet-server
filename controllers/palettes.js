//========================================================
//====================    Palettes   =====================
//========================================================

var util = require('../config/util');

const Palette = require('../models/palette');
var User = require('../models/user');

module.exports = {
  get_ShowPalettesList: function(req, res){
  	console.log("GET /palettes");

  	var version = req.query.version;

  	if(version == null){ //Todos
  		console.log("GET ALL, version == null");
  		Palette.find({}, async (err, palettes) =>{
        try {
          if(req.query.json ==="true"){
    				util.sendJsonResponse(res, palettes);
    			}else{
            res.render("palettes/addPalette",{
              palettelist:palettes
            });
    			}
        } catch {
          console.log("Error: "+err);
        }
  		});
  	}else{ //Recupero solo esos
  		console.log("GET /version = "+version);
  		Palette.find({"version" : version}, function(err, palettes){
  			if(err){
  				console.log("Error: "+err);
  			}

  			if(req.query.json ==="true"){
  				util.sendJsonResponse(res, palettes);
  			}else{
          res.render("palettes/addPalette",{
            palettelist:palettes
          });
  			}
  		});
  	}
  },
  post_AddPalette: function(req, res){
  	//a partir del ? vienen los parámetros

  	var name = req.body.name;
  	var content = req.body.content;
  	var uri = req.body.ecoreURI;
  	var version = req.body.version;
  	var ext = req.body.extension;

  	if(version == undefined){
  		version = 2;
  	}

  	console.log("/PALETTES");
  	console.log("URI: " + uri);

  	if(name != null) {
  		var newPalette = Palette({
  			name: name,
  			content: content,
  			ecoreURI: uri,
  			version:version,
  			extension:ext
  		});

  		console.log(newPalette);

  		newPalette.save(function(err){
  			console.log("Error añadiendo paleta: " +err);
  			if(err){
  				console.log("Efectivamente hay un error: " +err);
  				if(req.query.json === "true"){
  					console.log("Adding error: " + err);
  					util.sendJsonError(res, {code:300, msg:err});
  				}else{
  					//Load error web
  					util.endResponse(res);
  				}
  			}else{
  				console.log("Paleta añadida");
  				//Everything ok
  				if(req.query.json === "true"){
  					util.sendJsonResponse(res, {code:200, msg:"Palette added properly"});
  				}else{
  					//res.redirect("");
  					res.redirect("/palettes");
  					util.endResponse(res);
  				}

  			}
  		});
  	}
  },
  get_Palette: function(req,res){
  	console.log("GET /palettes/" + req.params.pname);

  	Palette.findOne({name:req.params.pname}, function(err, palette){
  		if(err){
  			if(req.query.json === "true"){
  				util.sendJsonError(res, {code: 301, msg:err});
  			}else{
  				//cargar página de error
  				util.endResponse(res);
  			}
  		}else{
  			if(req.query.json === "true"){
  				util.sendJsonResponse(res, {code:200, body:palette});
  			}else{
  				res.render("palettes/paletteInfo",{
  					name:palette.name,
  					content:palette.content
  				});
  			}
  		}
  	});
  },
  post_RemovePalette: function(req, res){
  	console.log("DELETE /palettes/"+ req.params.pname.toLowerCase());

  	Palette.findOne({name:req.params.pname}, function(err, palette){

  		if(palette){
  			palette.remove(function(err, pal){
  				console.log("--->" +err);
  				console.log("--->" + pal);

  				if(err){
  					//Error on removal
  					if(req.query.json === "true"){
  						util.sendJsonError(res, {code: 302, msg: err});
  					}else{
  						//Load error page
  						util.endResponse(res);
  					}
  				}else{
  					//Removing has work
  					if(req.query.json === "true"){
  						console.log("palette removed")
  						util.sendJsonResponse(res, {code:200, msg:"Palette removed"});
  					}else{
  						//Load web
  						res.redirect("/palettes");
  					}
  				}
  			});
  		}else{
  			//La paleta con ese nombre no existe, devolvemos error
  			if(req.query.json === "true"){
  				util.sendJsonError(res, {code: 301, msg:"Palette doesn't exist"});
  			}else{
  				//Load web
  				util.endResponse(res);
  			}
  		}
  	});
  },
  put_UpdatePalette: function(req, res){
  	console.log("PUT /palettes/"+req.params.pname);

  	Palette.findOne({name:req.params.pname}, function(err, palette){

  		if(palette){
  			//La paleta existe, intentamos actualizarla
  			palette.content = req.body.content;
  			palette.save(function(err){
  				if(err){
  					//Error al actualizar elemento
  					if(req.query.json === "true"){
  						util.sendJsonError(res, {code: 303, msg:"Error on update element"});
  					}else{
  						//Load web
  						util.endResponse(res);
  					}
  				}else{
  					//Se ha actualizado correctamente
  					if(req.query.json === "true"){
  						console.log("Palette updated\n");
  						util.sendJsonResponse(res, {code:200, msg:"Palette updated"});
  					}else{
  						//Load web
  						util.endResponse(res);
  					}
  				}
  			});
  		}else{
  			//No existe la paleta
  			if(req.query.json ==="true"){
  				util.sendJsonError(res, {code:301, msg:"Palette doesn't exist"});
  			}else{
  				//Load web
  				util.endResponse(res);
  			}
  		}
  	});
  }
};
