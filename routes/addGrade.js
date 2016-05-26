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


	app.post('/addGrade', function(req,res){
		
		var courseID 			= req.body.courseID;
		var userID 				= req.body.userID;
		var grade 				= req.body.grade;
		var gradeDescription 	= req.body.gradeDescription;
      	
      	console.log(gradeDescription)
	
		connection.query('INSERT INTO FacescSchema.grade SET ?', {grade: grade, description: gradeDescription}, function(err, result) {
  			if (err){
  				res.send('error');
  			} 
  			else{

				var gradeID = result.insertId; 
				console.log(gradeID)
				console.log(userID)
				console.log(courseID)

				connection.query('INSERT INTO FacescSchema.UserCourseGrade SET ?', {courseID: courseID, userID: userID, gradeID: gradeID}, function(err, result) {
					if (err){
						res.send(err);
					} 
					else{
						res.send('Adicionado!')
					}
				})
  			}

			
		});	


	        	


	        	
	        
               
    })
}