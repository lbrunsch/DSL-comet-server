//========================================================
//=======================    JSON    =====================
//========================================================

var util = require('../config/util');

const Json = require('../models/json');

module.exports = {
  get_AllJson: function(req, res){
  	console.log("GET /jsons");
  		Json.find({}, function(err, jsons){
  			if(err){
  				console.log("Error: "+err);
  			}

  			//if(req.query.json ==="true"){
  				util.sendJsonResponse(res, jsons);
  			/*}else{
  				//Cargar la web
  				res.render("ecoreList",{
  					ecorelist:jsons
  				});
  			}*/
  		});
  },
  get_Json: function(req, res){
  	console.log("GET /jsons/", req.params.name.replace(/ /g,''));

  	//Abro el json que se llama así
  	//Devuelvo un json con content el contenido del fichero

  	if(req.params.name == null){
  		console.log("req.name == null");
  		if(req.query.json === "true"){
  			util.sendJsonError(res, {code: 305, msg:"Name is null"});
  		}else{
  			util.endResponse(res);
  		}
  	}else{
  		Json.findOne({name:req.params.name}, function(err, json){
  		if(!err){
  			//json.content
  			if(req.query.json === "true"){
  				console.log("Devolviendo json")
  				util.sendJsonResponse(res, {code:200, content:json.content});
  			}else{
  				//res.redirect("/ecores");
  				util.endResponse(res);
  			}
  		}else{
  			if(req.query.json === "true"){
  				util.sendJsonError(res, {code: 301, msg:"JSON doesn't exist"});
  			}else{
  				//Load web
  				util.endResponse(res);
  			}
  		}
  	});
  	}
  },
  get_JsonByUri: function(req, res){

  	console.log("\t/jsonbyuri");
  	//Devuelvo un json con content el contenido del fichero

  	if(req.query.uri == undefined){
  		console.log("\treq.uri == null");
  		if(req.query.json === "true"){
  			util.sendJsonError(res, {code: 305, msg:"uri is null"});
  		}else{
  			util.endResponse(res);
  		}
  	}else{
  		console.log("\treq.uri is ok: " + req.uri);
  		Json.findOne({URI:req.query.uri}, function(err, json){
  			console.log("\tERROR: " + err);
  			if(json != null)
  				console.log("\tFound one: " + json);
  			if(!err){
  				console.log("\tThere is no error");
  				if(req.query.json === "true"){
  					console.log("\tDevolviendo json")
  					if(json.content != null)
  						util.sendJsonResponse(res, {code:200, content:json.content});
  					else
  						util.sendJsonResponse(res, {code:200, content:"json.content"});
  				}else{
  					//res.redirect("/ecores");
  					util.endResponse(res);
  				}
  			}else{
  				console.log("\tThere is an error")
  				if(req.query.json === "true"){
  					util.sendJsonError(res, {code: 301, msg:"JSON doesn't exist"});
  				}else{
  					//Load web
  					util.endResponse(res);
  				}
  			}
  	});
  	}
  }
};
