let smarts = require('smarts')()
let Uri = require('sentience')['uri.v2.js']
;
(async () => {
	let MongoClient = require('mongodb').MongoClient
	
	let uri = `mongodb://test1:test1@localhost:27017/admin?authSource=admin`
	console.log(uri)
	// MongoClient.connect(uri, {useNewUrlParser: true}, function(err, res){
	// 	console.log(err)
	// 	console.log(res.length)
	// })
	let connection = await MongoClient.connect(uri, { useNewUrlParser: true }).catch(err=>console.error(err))
	console.log(connection && connection.length !== 0)
})()

// 'mongodb://test1:test1@localhost:27017/admin?authMechanism=DEFAULT&authSource=admin'
// 'mongodb://test1:test1@localhost:27017/admin?authMechanism=DEFAULT&authSource=admin'