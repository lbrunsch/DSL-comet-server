//========================================================
//================    MONGOOSE    ========================
//========================================================

var mongoose = require('mongoose');

//Connection events
mongoose.connection.once("open", function(){
  console.log("We're connected! Start listening...");

  //Start listening
  //app.listen(port, function() {
  //  console.log("Node server running, listening on port " +port);
  //});
});

mongoose.connection.on("error", function(err){
  console.log("Error "+ err);
  mongoose.connection.close();
  process.exit(1);
});


mongoose.connection.on("disconnected", function(){
  console.log("Mongoose disconnected");
  mongoose.connection.close();
});

module.exports = function(envConfig){

    var options = {authMechanism: 'ScramSHA1'};

    // connect to database
    mongoose.connect(envConfig.database, function(){
        console.log('connected to database!')
    });
};
