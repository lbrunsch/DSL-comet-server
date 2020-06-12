//========================================================
//===============   Auxiliar functions   =================
//========================================================

module.exports = {
  sendJsonResponse: function (res, element){
  	//console.log("en sendJsonResponse. Element = " + element);
  	res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify({code: "200", array:element}));
  },
  sendJsonError: function (res, text){
  	//console.log("En sendJsonError. Text = "+ text);
  	res.setHeader("Content-Type", "application/json");
    console.log(text);
  	res.send(JSON.stringify({error: text}));
  },
  endResponse: function (res){
  	res.end();
  }
}
