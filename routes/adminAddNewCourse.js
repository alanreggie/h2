var mysql       = require('mysql');
var validator = require("email-validator");

module.exports = function (app){


	app.post('/adminAddNewCourse', function(req,res){

		var connection = mysql.createConnection({
		  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
		  user     : 'alanmichaanfa',
		  password : 'msft210amz*224',
		  database : 'alanmichaanfacesc',
		  port     : '3306',

		});

		connection.connect();
		
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

		connection.query('INSERT INTO FacescSchema.course SET ?', {courseName: courseName, courseYear: courseYear, courseSection: courseSection, courseDescription:courseDescription}, function(err, result) {
			  if (err) res.send(err);


  
        	res.send(result);

        })

        connection.end()
         
    })
}