var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){



	app.post('/getProfessorsInCourse', function(req,res){


		
		var courseID = req.body.courseID;
		connection.query('SELECT * from (user INNER JOIN UserCourseGrade on UserCourseGrade.userID = user.userID) where UserCourseGrade.courseID =? and user.userType in (\'Professor\',\'Estudante\') group by user.userID order by user.userType =\'Professor\' desc', [courseID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
	    })
        
    })
}