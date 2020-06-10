var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'DSL-Comet::Sign Up' });
});



router.post("/register", function(req, res){
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
		var newUser = User({
			name: name,
			lastname: lastname,
			email : email,
			username : username,
			password:password,
      role:"editor"
			//previewImage : {data : imageData, contentType :"image/png"}
		});

		newUser.save(function(err){
			if(err){
				console.log("Adding error: " + err);
			}else{
				console.log("User added");
				//todo bien, devolvemos añadido correctamente
				//if(req.query.json === "true"){
				//}else{
					//res.redirect("");
					//endResponse(res);
				//}
			}
		});
	}else{
		res.end();
	}

});



module.exports = router;
