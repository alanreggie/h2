var mysql       = require('mysql');



module.exports = function (app){



	app.post('/getCoursesOfUser', function(req,res){


    var connection = mysql.createConnection({
      host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
      user     : 'alanmichaanfa',
      password : 'msft210amz*224',
      database : 'alanmichaanfacesc',
      port     : '3306',

    });

    connection.connect();
		
    var userID = req.body.userID;

		
		var courseID = req.body.courseID;
		connection.query('SELECT * from (FacescSchema.course INNER JOIN FacescSchema.UserCourseGrade on FacescSchema.UserCourseGrade.courseID = FacescSchema.course.courseID) where FacescSchema.UserCourseGrade.userID =? group by FacescSchema.UserCourseGrade.courseID order by FacescSchema.UserCourseGrade.courseID asc', [userID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	//console.log(rows)

        	res.send(rows);
	    })

    connection.end();
        
    })

}