let fs = require('fs')
let path = require('path')
let Exports = []
let files = fs.readdirSync(path.join(__dirname+'/node_modules/'))
try {
	files.forEach((file)=>{
		// object
		try {
			Exports[file] = require(file)
		} catch(err){
			if(err){
				console.error(err)
			}
		}
		// array
		// Exports.push(
		// 	require(file)
		// )
	})
} catch(err){
	if(err){
		console.error(err)
	}
}

module.exports = Exports