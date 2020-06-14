//========================================================
//===============   Auxiliar functions   =================
//========================================================

module.exports = {
  sendJsonResponse: function (res, element){
  	//console.log("en sendJsonResponse. Element = " + element);
  	//res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify({code: "200", array:element}));
  },
  sendJsonError: function (res, text){
  	//console.log("En sendJsonError. Text = "+ text);
  	//res.setHeader("Content-Type", "application/json");
    console.log(text);
  	res.send(JSON.stringify({error: text}));
  },
  endResponse: function (res){
  	res.end();
  },
  isEmail: function (email) {
    if (typeof email !== 'string') {
      return false;
    }
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return emailRegex.test(email);
  }
}
