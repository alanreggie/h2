var mysql       = require('mysql');


module.exports = function (app){



	app.post('/getProfessorsInCourse', function(req,res){

      var connection = mysql.createConnection({
        host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
        user     : 'alanmichaanfa',
        password : 'msft210amz*224',
        database : 'alanmichaanfacesc',
        port     : '3306',

      });

      connection.connect();

		
		var courseID = req.body.courseID;
		connection.query('SELECT * from (FacescSchema.user INNER JOIN FacescSchema.UserCourseGrade on FacescSchema.UserCourseGrade.userID = FacescSchema.user.userID) where FacescSchema.UserCourseGrade.courseID =? and FacescSchema.user.userType in (\'Professor\',\'Estudante\') group by user.userID order by user.userType =\'Professor\' desc', [courseID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
	    })
        
        connection.end()
        
    })
}