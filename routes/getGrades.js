var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){

	app.post('/getGrades', function(req,res){
	

		var userID = req.body.UserID;
		var courseID = req.body.courseID;
		console.log(userID)



		/*where user.userID=?',[userID]*/
		connection.query('SELECT * from (((user INNER JOIN UserCourseGrade on user.userID = UserCourseGrade.userID) INNER JOIN course on UserCourseGrade.courseID = course.courseID) INNER JOIN grade on UserCourseGrade.gradeID = grade.gradeID) where user.userID=? and course.courseID =?' , [userID, courseID] ,  function(err, rows, fields) { 
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

	    
    })
}