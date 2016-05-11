var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){



	app.post('/getCoursesOfUser', function(req,res){

		var userID = req.body.userID;

		
		var courseID = req.body.courseID;
		connection.query('SELECT * from (course INNER JOIN UserCourseGrade on UserCourseGrade.courseID = course.courseID) where UserCourseGrade.userID =? group by UserCourseGrade.courseID order by UserCourseGrade.courseID asc', [userID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
	    })
        
    })
}