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


	app.post('/addUserToCourse', function(req,res){
		
		var courseArray = req.body.courseArray;
		var userID = req.body.userID;
		var userName = req.body.userName;

		console.log(courseArray.length)
		var returnMessage = ''
		
		//check to see whether the professor is already in the course and don't add a duplicate
		//courseArray [i] is underfined inside SQL

/*
		for(i = 0; i < courseArray.length; i++){
			var self = this;
				connection.query({
				  sql: 'SELECT * FROM `UserCourseGrade` WHERE courseID = ? and userID = ?',
				  timeout: 40000, // 40s 
				  values: [courseArray[i], userID]
				}, function (error, rows, fields) {
					
					//var courseID = result.insertId;
					
					console.log(fields)
					if(error){
		        		console.log(error)	
		        	}
		        	/////////////////////CHANGED TO >= FROM >
		        	if(rows.length >= 1){
		        		//res.send(rows)
		        		console.log(' O usuario: ' + userName + ' ja esta no curso: ' + courseID + 'e nao foi adicionado. ')
		        	}
		        	else{
						connection.query('INSERT INTO UserCourseGrade SET ?', {courseID: courseID, userID: userID}, function(err, result) {
							  if (err) console.log(err);

							    //returnMessage += ' O usuario: ' + userName + ' foi adicionado ao curso: ' + courseArray[0];

				        		console.log(result);

				        })
		        	}


		        	//console.log(rows)
				});
					res.send(' O usuario: ' + userName + ' foi adicionado');

		}*/

         
    })
}