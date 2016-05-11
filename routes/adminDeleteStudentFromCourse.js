var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){

	app.post('/deleteStudentFromCourse', function(req,res){
		
		var courseID = req.body.courseID;
		var userID = req.body.userID
        
        connection.query('DELETE FROM UserCourseGrade where courseID =? and userID =?',[courseID, userID], function (err, result) {
        	if(err){
        		res.send(err)	
        	}

        	//console.log(rows)

        	res.send(result);
	    })
    })
}