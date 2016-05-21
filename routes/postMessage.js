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

      	connection.query('SELECT * from ((UserConvo INNER JOIN convo on convo.convoID = UserConvo.convoID) INNER JOIN user on convo.userID = user.userID) where (UserConvo.ID1 =? and UserConvo.ID2 =?) OR (UserConvo.ID1 =? and UserConvo.ID2 =?)', [userID1, userID2, userID2, userID1] ,function(err, rows, fields) {
        	if(err){
        		res.send('Erro')	
        	}
        	else{
        		if(rows.length == 0){ //create UserConvo and Convo

					connection.query('INSERT INTO UserConvo SET ?', {ID1: userID1, ID2: userID2}, function(err, result) {
			  			if (err){
			  				res.send('Erro');
			  			} 
			  			else{

							var convoID = result.insertId; 
							console.log(convoID)
							

							connection.query('INSERT INTO convo SET ?', {convoID: convoID, userID: userID1, message: message, date:date}, function(err, result) {
								if (err){
									res.send('Erro');
								} 
								else{
									res.send('Adicionado!')
								}
							})
			  			}
			  		})

        		}
        		else{ //add new Convo

        			//console.log(rows[0].convoID)
        			var convoID = rows[0].convoID
        			connection.query('INSERT INTO convo SET ?', {convoID: convoID, userID: userID1, message: message, date:date}, function(err, result) {
						if (err){
							res.send('Erro');
						} 
						else{
							res.send('Adicionado!')
						}
					})
        		}

        		//res.send(rows);	

        	}	
	    })


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