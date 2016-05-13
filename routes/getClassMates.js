var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){

	app.post('/getClassMates', function(req,res){
	

		var userID = req.body.userID;
		

		/*where user.userID=?',[userID]*/
		connection.query('SELECT * from (user INNER JOIN UserCourseGrade on user.userID = UserCourseGrade.userID) where user.userID=? group by UserCourseGrade.courseID' , [userID] ,  function(err, rows, fields) { 
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
		    		connection.query('SELECT * from (user INNER JOIN UserCourseGrade on user.userID = UserCourseGrade.userID) where UserCourseGrade.courseID  in (?) and UserCourseGrade.userID!=? and user.userType in (\'Estudante\',\'Professor\') group by UserCourseGrade.userID' ,[IDs, userID ] ,  function(err, rows, fields) { 
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

	    
    })
}