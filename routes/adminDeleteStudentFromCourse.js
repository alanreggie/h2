var mysql       = require('mysql');

var connection = mysql.createConnection({
  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
  user     : 'alanmichaanfa',
  password : 'msft210amz*224',
  database : 'alanmichaanfacesc',
  port     : '3306',

});


connection.connect();

module.exports = function (app){

	app.post('/deleteStudentFromCourse', function(req,res){
		
		var courseID = req.body.courseID;
		var userID = req.body.userID
        
        connection.query('DELETE FROM FacescSchema.UserCourseGrade where courseID =? and userID =?',[courseID, userID], function (err, result) {
        	if(err){
        		res.send(err)	
        	}

        	//console.log(rows)

        	res.send(result);
	    })
    })
}