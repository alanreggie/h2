module.exports = function(app){


 var AWS = require('aws-sdk'); 
	  
	  AWS.config.update({
	    accessKeyId: 'AKIAICXB5UYPJ5IYMEAQ', 
	    secretAccessKey: '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',
	    maxRetries: 2
	  });

  		app.post('/getFiles', function(req, res) {
				

  			 		/*var allKeys = []
				  		function listAllKeys(marker, cb)
						{
						  s3.listObjects({Bucket: s3bucket, Marker: marker}, function(err, data){
						    allKeys.push(data.Contents);

						    if(data.IsTruncated)
						      listAllKeys(data.NextMarker, cb);
						    else
						      cb();
						  });
						}*/


  			var s3 = new AWS.S3(); 
  			var params = { 
				 Bucket: 'facesc-courses',
				 Prefix: '1000/'
			}

			var urls = []
			s3.listObjects(params, function (err, data) {
				 if(err)throw err;
				 for (var i = 0; i < data.Contents.length; i++){
				 	console.log(data.Contents)
				 	var name = data.Contents[i].Key
				 	name = name.substring(name.indexOf("/") + 1);
				 	var object = {
				 		'url': 'https://s3-sa-east-1.amazonaws.com/facesc-courses/' + data.Contents[i].Key,
				 		'name': name,
				 		'size': data.Contents[i].Size
				 	}
				 	urls.push(object)
				 }
				 res.send(urls)
			});



  					/*new AWS.S3().getObject({ Bucket: 'facesc-course', Key: '1000' }, function(err, data)
					{
					    if (!err)
					        console.log(data.Body.toString());
					});*/


			/*var s3 = new AWS.S3(); 
  			s3.listBuckets(function(err, data) {
				  //console.log(data)
				  if (err) { 
				  		console.log("Error:", err); 
				  }
				  else {		 

					    for (var index in data.Buckets) {
						      var bucket = data.Buckets[index];
						      console.log(bucket)
						      //console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
					    }
				  }
			})*/
			//res.send('hi')
		})



}
