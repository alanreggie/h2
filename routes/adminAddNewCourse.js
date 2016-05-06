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


	app.post('/adminAddNewCourse', function(req,res){
		
		var courseName = req.body.CourseName;
		var courseDescription = req.body.CourseDescription;
		var courseYear = req.body.CourseYear;
		var courseSection = req.body.CourseSection;

		//var professorsArr = req.body.Professors;
		//console.log(professorsArr[0])
		
		

		/*var profArr = []
		for(i = 0; i < professorsArr.length; i++){
			var str = professorsArr[i];
			var rese = str.split(" ");
			//console.log(rese[0])
			profArr.push(rese[0])
		}
		console.log(profArr)*/

		connection.query('INSERT INTO course SET ?', {courseName: courseName, courseYear: courseYear, courseSection: courseSection, courseDescription:courseDescription}, function(err, result) {
			  if (err) res.send(err);


  
        	res.send(result);

        })
         
    })
}