var mysql       = require('mysql');

module.exports = function (app){

	app.post('/getClassMates', function(req,res){
	
		var connection = mysql.createConnection({
		  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
		  user     : 'alanmichaanfa',
		  password : 'msft210amz*224',
		  database : 'alanmichaanfacesc',
		  port     : '3306',

		});

		connection.connect();

		var userID = req.body.userID;
		

		/*where user.userID=?',[userID]*/
		connection.query('SELECT * from (FacescSchema.user INNER JOIN FacescSchema.UserCourseGrade on FacescSchema.user.userID = FacescSchema.UserCourseGrade.userID) where FacescSchema.user.userID=? group by FacescSchema.UserCourseGrade.courseID' , [userID] ,  function(err, rows, fields) { 
			if(err){
		    	res.send(err)	
		    }		

		   // console.log(userID)
		    		var IDs = []
		    		for (i=0 ; i < rows.length; i++){
		    			IDs.push(rows[i].courseID)
		    		}
		    		
		    		/*IDs.push(rows[1].courseID)*/
		    		//console.log(IDs)
		    	//rows[i].courseID
		    		connection.query('SELECT * from (FacescSchema.user INNER JOIN FacescSchema.UserCourseGrade on user.userID = FacescSchema.UserCourseGrade.userID) where FacescSchema.UserCourseGrade.courseID  in (?) and FacescSchema.UserCourseGrade.userID!=? and FacescSchema.user.userType in (\'Estudante\',\'Professor\') group by FacescSchema.UserCourseGrade.userID' ,[IDs, userID ] ,  function(err, rows, fields) { 
						if(err){
					    	res.send(err)	
					    }

					    res.send(rows);


					})





			console.log(rows)

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