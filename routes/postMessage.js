var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();


module.exports = function (app){


	app.post('/postMessage', function(req,res){
		
		var userID1 			= req.body.user1;
		var userID2				= req.body.user2;
		var message 			= req.body.message;
		var date 				= req.body.date;
      	
      	//check if convo already exists, if it doesn't, add a UserConvo and a convo, else just add a convo.

		/*connection.query('INSERT INTO UserConvo SET ?', {grade: grade, description: gradeDescription}, function(err, result) {
  			if (err){
  				res.send('error');
  			} 
  			else{

				var gradeID = result.insertId; 
				console.log(gradeID)
				console.log(userID)
				console.log(courseID)

				connection.query('INSERT INTO UserCourseGrade SET ?', {courseID: courseID, userID: userID, gradeID: gradeID}, function(err, result) {
					if (err){
						res.send(err);
					} 
					else{
						res.send('Adicionado!')
					}
				})
  			}

			
		});	*/


	        	


	        	
	        
               
    })
}