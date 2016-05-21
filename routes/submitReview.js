var mysql       = require('mysql');
var validator = require("email-validator");
//var nodemailer = require('nodemailer');



var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();


module.exports = function (app){


	app.post('/submitReview', function(req,res){
		
		var val0 = req.body.val0;
		var val1 = req.body.val1;
		var val2 = req.body.val2;
		var val3 = req.body.val3;
		var val4 = req.body.val4;

		var userID = req.body.userID;
		var courseID = req.body.courseID;
		var otherDetails = req.body.otherDetails;

		//var professorsArr = req.body.Professors;
		console.log(val0, val1, val2, val3, val4, userID, courseID, otherDetails)
		
	
		 connection.query('INSERT INTO rating SET ?', {rating0: val0, rating1: val1, rating2: val2, rating3:val3, rating4:val4, userID:userID, courseID:courseID, otherDetails:otherDetails}, function(err, result) {
		 	  if (err){
		 	  		res.send('Erro');
		 	  }
		 	  else{
		 	  	res.send('woohoo');
		 	  } 
         })
         
    })
}