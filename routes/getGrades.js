var mysql       = require('mysql');

module.exports = function (app){

	app.post('/getGrades', function(req,res){

		var connection = mysql.createConnection({
		  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
		  user     : 'alanmichaanfa',
		  password : 'msft210amz*224',
		  database : 'alanmichaanfacesc',
		  port     : '3306',

		});

		connection.connect();	

		var userID = req.body.UserID;
		var courseID = req.body.courseID;
		console.log(userID)



		/*where user.userID=?',[userID]*/
		connection.query('SELECT * from (((FacescSchema.user INNER JOIN FacescSchema.UserCourseGrade on FacescSchema.user.userID = FacescSchema.UserCourseGrade.userID) INNER JOIN FacescSchema.course on FacescSchema.UserCourseGrade.courseID = FacescSchema.course.courseID) INNER JOIN FacescSchema.grade on FacescSchema.UserCourseGrade.gradeID = FacescSchema.grade.gradeID) where FacescSchema.user.userID=? and FacescSchema.course.courseID =?' , [userID, courseID] ,  function(err, rows, fields) { 
			if(err){
		    	res.send(err)	
		    }

			console.log(rows[0])

			res.send(rows);
		})


		/*var Email = req.body.Email;
		var Password = req.body.Password;
        
        connection.query('SELECT * from user where userType=?',[5], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
	    })*/

	    connection.end()
    })
}