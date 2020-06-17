//========================================================
//====================    Diagrams   =====================
//========================================================
var util = require('../config/util');

const Diagram = require('../models/diagram');

module.exports = {
  get_ShowDiagramsList: function(req, res){
  	console.log("GET /diagrams")

  	Diagram.find({}, function(err, diagrams){
  		if(err){
  			console.log("Error: "+err);
  		}

  		if(req.query.json ==="true"){
  			util.sendJsonResponse(res, diagrams);
  		}else{
  			//Cargar la web
  			//endResponse(res);
  			res.render("diagrams/diagramList", {diagramList:diagrams});
  		}
  	});
  },
  post_AddDiagram: function(req, res){
  	//a partir del ? vienen los parámetros
  	console.log("POST /diagrams");

  	//var json = JSON.parse(req.body);
  	console.log(req.body);
  	console.log("name: "+req.body.name);
  	console.log("dateString: "+ req.body.dateString);
  	console.log("content: "+req.body.content);

  	var name = req.body.name;
  	var content = req.body.content;
  	var dateString = req.body.dateString;
  	var usedExtension = req.body.paletteExtension;

  	var imageData = req.body.imageData;

  	//var decodedImage = new Buffer(imageData, 'base64').toString('binary');

  	if(name != null) {
  		var newDiagram = Diagram({
  			name: name,
  			content: content,
  			dateString : dateString,
  			imageString : imageData,
  			paletteExtension:usedExtension
  			//previewImage : {data : imageData, contentType :"image/png"}
  		});

  		newDiagram.save(function(err){
  			if(err){
  				console.log("Adding error: " + err);
  				if(req.query.json === "true"){
  					util.sendJsonError(res, {code:300, msg:err});
  				}else{
  					//Cargar la web de error
  					util.endResponse(res);
  				}
  			}else{
  				console.log("Diagram added");
  				//todo bien, devolvemos añadido correctamente
  				if(req.query.json === "true"){
  					util.sendJsonResponse(res, {code:200, msg:"Diagram added properly"});
  				}else{
  					//res.redirect("");
  					util.endResponse(res);
  				}
  			}
  		});
  	}else{
  		util.endResponse(res);
  	}
  },
  get_Diagram: function(req,res){
  	console.log("GET /diagrams/" + req.params.dname);

  	Diagram.findOne({name:req.params.dname}, function(err, diagram){
  		if(err){
  			if(req.query.json === "true"){
  				util.sendJsonError(res, {code: 301, msg:err});
  			}else{
  				//cargar página de error
  				util.endResponse(res);
  			}
  		}else{
  			if(req.query.json === "true"){
  				util.sendJsonResponse(res, {code:200, body:diagram});
  			}else{
  				//endResponse(res);
  				res.render("diagrams/diagramInfo", {diagram:diagram});
  			}
  		}
  	});
  },
  get_DiagramImage: function(req,res){
  	console.log("GET /diagrams/" + req.params.dname+ "/image" );

  	Diagram.findOne({name:req.params.dname}, function(err, diagram){

  		var imageStr = diagram.imageString;

  		//console.log(image);
  		var decodedImage = new Buffer(imageStr, 'base64').toString('binary');
  		res.writeHead('200', {'Content-Type': 'image/png'});
       	res.end(decodedImage,'binary');
  	});
  },
  delete_RemoveDiagram: function(req, res){
  	console.log("DELETE /diagrams/"+ req.params.dname);

  	Diagram.findOne({name:req.params.dname}, function(err, diagram){

  		if(diagram){
  			diagram.remove(function(err){
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
  						console.log("Diagram removed")
  						util.sendJsonResponse(res, {code:200, msg:"Diagram removed"});
  					}else{
  						//Load web
  						util.endResponse(res);
  					}
  				}
  			});
  		}else{
  			//El diagrama con ese nombre no existe, devolvemos error
  			if(req.query.json === "true"){
  				util.sendJsonError(res, {code: 301, msg:"Diagram doesn't exist"});
  			}else{
  				//Load web
  				util.endResponse(res);
  			}
  		}
  	});
  },
  put_UpdateDiagram: function(req, res){
  	console.log("PUT /diagrams/"+req.params.dname);

  	Diagram.findOne({name:req.params.dname}, function(err, diag){

  		if(diag){
  			//La paleta existe, intentamos actualizarla
  			diag.content = req.body.content;
  			diag.save(function(err){
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
  						console.log("Diagram  " + diag.name +"  updated\n");
  						util.sendJsonResponse(res, {code:200, msg:"Diagram updated"});
  					}else{
  						//Load web
  						util.endResponse(res);
  					}
  				}
  			});
  		}else{
  			//No existe el diagrama
  			if(req.query.json ==="true"){
  				util.sendJsonError(res, {code:301, msg:"Diagram doesn't exist"});
  			}else{
  				//Load web
  				util.endResponse(res);
  			}
  		}
  	});
  }
};
