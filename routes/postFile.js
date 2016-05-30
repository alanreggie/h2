/*module.exports = function (app){

	app.post('/upload', function(req,res){
		//console.log(req.body)
		console.log(req.files)

		res.send("hello")
	})
}*/


module.exports = function(app){

	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();

	//var Minio = require('minio')
	var fs = require('fs')

	  var AWS = require('aws-sdk'); 
	  AWS.config.update({
	    accessKeyId: 'AKIAIFYS7RHA4C4ABOXA', 
	    secretAccessKey: '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',
	    maxRetries: 2
	  });

		app.post('/upload', multipartMiddleware, function(req, res) {
		  	//console.log(req.body, req.files);
		  

		    var file = req.files.file;
		    var body = req.body
		    console.log(body)
		    //console.log(file)

		     fs.readFile(file.path, function(err, rawdata){
		          var s3 = new AWS.S3(); 
		          var files = JSON.stringify(req.files)
		          //console.log(rawdata)
		          //Key: '/condo/full'
		          var params = {
		            Bucket: 'facesc-courses', 
		            Key: 'hello/' + file.name, 
		            Body: rawdata,
		            ACL:'public-read'
		          }
		          s3.putObject(params, function(err, data) {
		            if (err){
		              //console.log('Error 2')
		               res.send('Erro')
		              throw err;
		            }
		            else{
		              //console.log('S3 uploaded')
		              res.send('Sucesso')
		              //callback(null, item)
		            }
		          })
		     })

	});
}
