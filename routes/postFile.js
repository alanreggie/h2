/*module.exports = function (app){

	app.post('/upload', function(req,res){
		//console.log(req.body)
		console.log(req.files)

		res.send("hello")
	})
}*/

module.exports = function(router){

	router.post('/upload', function(req, res){
		console.log(req.body);
		console.log(req.files);
		res.json({success: true});
	});

}
