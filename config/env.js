var path = require('path');
var rootPath = path.normalize(__dirname + '/../'); // normalizes to base path

// retrieves username and password to connect to the database
var username;
var password;
process.argv.forEach(function (val, index, array) {
  if(index == 2){ //Username
  	username = val;
  }else if(index == 3){ //Password
  	password = val
  }
});
var database = "mongodb://" +username+":"+password + "@ds115546.mlab.com:15546/diagrameditor";

module.exports = {
    development: {
        rootPath: rootPath,
        database: database,
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        database: database,
        port: process.env.PORT || 80
    }
};
