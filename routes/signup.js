var util = require('../config/util');

module.exports = {
  displayForm: function(req, res, next) {
    res.render('signup', { title: 'DSL-Comet::Sign Up' });
  },
  register: function(req, res){
  	//a partir del ? vienen los parámetros
  	console.log("POST /register");

  	//var json = JSON.parse(req.body);
  	console.log(req.body);
  	console.log("name: "+req.body.name);
  	console.log("lastname: "+ req.body.lastname);
  	console.log("email: "+req.body.email);

  	var name = req.body.name;
  	var lastname = req.body.lastname;
  	var email = req.body.email;

    var username = req.body.username;
    //TODO: Encriptar
  	var password = req.body.password;

  	//var decodedImage = new Buffer(imageData, 'base64').toString('binary');

  	if(username != null) {
      console.log("User is about to be created");
  		var newUser = User({
  			name: name,
  			lastname: lastname,
  			email: email,
  			user: username,
  			password:password,
        role: "editor"
  			//previewImage : {data : imageData, contentType :"image/png"}
  		});

  		newUser.save(function(err){
        console.log("User is saving");
  			if(err){
  				console.log("Adding error: " + err);
          util.sendJsonError(res, {code:300, msg:err});
  			}else{
  				console.log("User added");
  				//todo bien, devolvemos añadido correctamente
  				//if(req.query.json === "true"){
            util.sendJsonResponse(res, {code:200, msg:"User added properly"});
  				//}else{
  					//res.redirect("");
  					//endResponse(res);
  				//}
  			}
  		});
  	}else{
  		util.endResponse(res);
  	}

  }
};
