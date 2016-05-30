
module.exports = function(app){

	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();

	//var Minio = require('minio')
	var fs = require('fs')

	  var AWS = require('aws-sdk'); 
	  AWS.config.update({
	    accessKeyId: 'AKIAIGC2NEG6WP5YAZTQ', 
	    secretAccessKey: '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',
	    maxRetries: 2
	  });

		app.post('/upload', multipartMiddleware, function(req, res) {
		  	//console.log(req.body, req.files);
		  

		    var file = req.files.file;
		    var body = req.body
		    var courseFolder = req.body.course
		    var size = file.size;
		    //console.log(body.course)
		    //console.log(file.size)

		    if(size > 1000000){
		    	 res.send('O Archivo tem que ser menos de 1Mb ou 1000000 bytes!')
		    }
		    else{
		    	fs.readFile(file.path, function(err, rawdata){
		          var s3 = new AWS.S3(); 
		          var files = JSON.stringify(req.files)
		          //console.log(rawdata)
		          //Key: '/condo/full'
		          var params = {
		            Bucket: 'facesc-courses', 
		            Key: courseFolder + '/' + file.name, 
		            Body: rawdata,
		            ACL:'public-read'
		          }
		          s3.putObject(params, function(err, data) {
		            if (err){
		              //console.log('Error 2')
		               res.send('Erro!')
		              throw err;
		            }
		            else{
		              //console.log('S3 uploaded')
		              res.send('Sucesso!')
		              //callback(null, item)
		            }
		          })
		     	})
		    }

		     

	});
}
