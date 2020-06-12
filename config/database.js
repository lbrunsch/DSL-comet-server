var mongoose = require('mongoose');

module.exports = function(envConfig){
    // register models
    //mongoose entity vars
    var Palette = require("./models/palette");
    var Diagram = require("./models/diagram");
    var Ecore = require("./models/ecore");
    var Json = require("./models/json");
    var Role = require("./models/role");
    var User = require('./models/user')
    var database = "diagrameditor";

    // connect to database
    mongoose.connect(envConfig.database, function(){
        console.log('connected to database!')
    });
};

//========================================================
//================    MONGOOSE    ========================
//========================================================


//var port = process.env.PORT || 8080;
//console.log("Port: "+ port);


//Connection events
//mongoose.connection.once("open", function(){
//	console.log("We're connected! Start listening...");

	//Start listening
	//app.listen(port, function() {
		//console.log("Node server running, listening on port " +port);
	//});
//});

//mongoose.connection.on("error", function(err){
//	console.log("Error");
//	mongoose.connection.close();
//	process.exit(1);
//});


//mongoose.connection.on("disconnected", function(){
//	console.log("Mongoose disconnected");
//	mongoose.connection.close();
//});

//var str = "mongodb://" +username+":"+password + "@ds115546.mlab.com:15546/diagrameditor";

//var options = {authMechanism: 'ScramSHA1'};

//var mongooseUri = uriUtil.formatMongoose(str);

//mongoose.connect(str, function(err){
//	if(err){
//		console.log("Error: "+ err);
//	}
//});
