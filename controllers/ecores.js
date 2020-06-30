//========================================================
//====================     eCores    =====================
//========================================================

var util = require('../config/util');
var fs = require('fs');
var childProcess = require('child_process');
var mkdirp = require('mkdirp');
var dir = '../tmp';
var path = require("path");

if (!fs.existsSync(dir)){
	console.log("Creo "+ dir);
	fs.mkdirSync(dir);
}

const Ecore = require('../models/ecore');
const Json = require('../models/json');
var User = require('../models/user');

function writeEcoreFileToFolder(ecore, uri){

	var name = path.join(__dirname, "/../tmp/"+ecore.name +".ecore");

	//var tempFilename = __dirname +"/files/ecores/"+ecore.name +".ecore";
	console.log("ecore route: "+ name);
	console.log("content " + ecore.content);


	fs.writeFile(name, ecore.content, function(err){
		console.log("vengo de intentar escribir. Err: "+err);
		if(err){
			console.log("Error escritura:  "+ err);
			//util.sendJsonError(res, {code:300, msg:"Error writing ecore file to folder"});
		}else{
			console.log("fichero ecore guardado correctamente");

			parseEcoreToJSON(ecore, uri);
		}
	});
}

function parseEcoreToJSON (ecore, uri){

	console.log("Voy a hacer el parsetojson");

	var sourceFile = __dirname +"/../tmp/"+ecore.name +".ecore";
	var outFile = __dirname +"/../tmp/"+ecore.name +".json";
	var exporterJar = path.join(__dirname, "/../exporter.jar");
	var command = "java -jar \""+exporterJar+"\" "+sourceFile + " " + outFile;
	console.log("executing: "+command);

	var cp = childProcess.exec(command , function(error, stdout, stderr){
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
		if(error){
			console.log("Error de salida: " + error);
			//util.sendJsonError(res, {code:300, msg:"JSON JAR returned error " + error});
		}else{
			console.log("jsonFile created :D");
			//Recupero ese json y lo añado a mongodb
			saveJSONtoMongodb(outFile, ecore.name, uri);
		}
	});

}

function saveJSONtoMongodb(jsonfile, name, uri){
		console.log("URI: " + uri);
		fs.readFile(jsonfile, 'utf8', function (err,data) {
		if (err) {
			return console.log("Error leyendo el json" +err);
		}

		var str = data;
		//Si no hay error, lo añado a mongodb
		var newJson = Json({
			name: name,
			content: str,
			URI:uri
		});

		newJson.save(function(err){
			if(err){
				console.log("Error añadiendo el json a mongod: "+err);
			}else{
				console.log("JSON añadido a mongodb");

			}
		});

		});
}

function parseEcoreToGraphicR (ecore){

}

module.exports = {
  get_ShowEcoreList: function(req, res){
  	console.log("GET /ecores");
  		Ecore.find({}, async (err, ecores) => {
				try {
					if(req.query.json ==="true"){
	  				util.sendJsonResponse(res, ecores);
	  			} else{
          res.render("ecores/ecoreList",{
            ecorelist:ecores
	      	 });
         }
				}catch (err){
  				console.log("Error: "+err);
  			}
  		});
  },
  post_AddEcore: function(req, res){
  	//a partir del ? vienen los parámetros
  	console.log("\n\n POST /ecores");

  	var name = req.body.name;
  	var content = req.body.content;
  	var uri = req.body.uri;
		var author = "MisoAdmin"
		if(res.locals.username) {
			author = res.locals.username;
		}

  	console.log("-----");
  	console.log(req.body);
  	console.log("-----");
  	console.log("name: " + name);
  	console.log("content: " + content);
  	console.log("uri " + uri);
  	console.log("-----");
		console.log("author " + author);
  	console.log("-----");

  	var autogenerateGrapicRStr = req.body.autogenerate;

  	var generate = false;


  	console.log("Should generate graphicR?");
  	if(autogenerateGrapicRStr === "on"){
  		generate = true;
  	}else{
  		generate = false;
  	}

  	console.log("Check name");
  	if(name != undefined) {
  		console.log("Name != null = " + name);

  		var newEcore= Ecore({
  			name: name.replace(/\s+/g, ''),
  			content: content,
  			URI: uri,
				author: author
  		});

  		console.log("newEcore:\n");
  		console.log(newEcore);

  		newEcore.save(function(err){

  			console.log("SAVE ecore. Error: " +err);

  			if(err){
  				console.log("return error");
  				if(req.query.json === "true"){
  					console.log("Adding error: " + err);
  					util.sendJsonError(res, {code:300, msg:err});
  				}else{
  					//Cargar la web de error
  					util.endResponse(res);
  				}
  			}else{
  				console.log("Ecore añadido a la base de datos. Let's write to folder");


  				writeEcoreFileToFolder(newEcore, uri);

  				//parseEcoreToJSON(newEcore);

  				if(generate == true){
  					parseEcoreToGraphicR(newEcore);
  				}else{
  					console.log("No se ha generado el graphicR")
  				}

  				//todo bien, devolvemos añadido correctamente
  				if(req.query.json === "true"){
  					util.sendJsonResponse(res, {code:200, msg:"ecore added properly"});
  				}else{
  					res.redirect("/ecores");
  					//endResponse(res);
  				}

  			}
  		});
  	}else{
  		console.log("name = undefined");
  		console.log("return error, name = undefined");
  				if(req.query.json === "true"){
  					console.log("Adding error: " + err);
  					util.sendJsonError(res, {code:300, msg:err});
  				}else{
  					//Cargar la web de error
  					util.endResponse(res);
  				}
  	}
  },
  get_Ecore: function(req,res){
  	console.log("GET /ecores/" + req.params.ename);


  	Ecore.findOne({name:req.params.ename}, function(err, ec){

  		if(err){
  			if(req.query.json === "true"){
  				util.sendJsonError(res, {code: 301, msg:err});
  			}else{
  				//cargar página de error
  				util.endResponse(res);
  			}
  		}else{

  			if(req.query.json === "true"){
  				//Puede que el ecore no exista
  				console.log("ecore: "+req.params.ename);
  				if(ec == null){
  					util.sendJsonResponse(res, {code:300 });
  				}else{
  					util.sendJsonResponse(res, {code:200, body:ec});
  				}

  			}else{
  				if(ec != null){
  					res.render("ecores/ecoreInfo",{
  						name:ec.name,
  						content:ec.content
  					});
  				}
  			}
  		}
  	});
  },
  post_RemoveEcore: function(req, res){
  	console.log("POST /ecores/.../delete"+ req.params.ename);

  	Ecore.findOne({name:req.params.ename}, function(err, ecore){

  		if(!err){
  			ecore.remove(function(err, pal){
  				//onsole.log("--->" +err);
  				//console.log("--->" + pal);

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

  					//Remove json file
  					Json.findOne({name:req.params.ename}, function(err, json){
  						if(!err){

  							json.remove(function(err, pal){
  								if(!err){
  									if(req.query.json === "true"){
  										console.log("ecore  & json removed")
  										util.sendJsonResponse(res, {code:200, msg:"Ecore removed"});
  									}else{
  										res.redirect("/ecores");
  									}
  								}else{
  									console.log("No se ha encontrado el json asociado");
  									util.sendJsonError(res, {code: 300, msg: err});
  								}
  							});

  						}
  					});


  					/**/
  				}
  			});
  		}else{
  			console.log("Ecore doesn't exists");
  			//El ecoer con ese nombre no existe, devolvemos error
  			if(req.query.json === "true"){
  				util.sendJsonError(res, {code: 301, msg:"Ecore doesn't exist"});
  			}else{
  				//Load web
  				util.endResponse(res);
  			}
  		}
  	});
  }
};
