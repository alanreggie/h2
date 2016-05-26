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


	app.post('/postMessage', function(req,res){
		
		var userID1 			= req.body.user1;
		var userID2				= req.body.user2;
		var message 			= req.body.message;
		var date 				= req.body.date;
      	
      	//check if convo already exists, if it doesn't, add a UserConvo and a convo, else just add a convo.

      	connection.query('SELECT * from ((FacescSchema.UserConvo INNER JOIN FacescSchema.convo on FacescSchema.convo.convoID = FacescSchema.UserConvo.convoID) INNER JOIN FacescSchema.user on FacescSchema.convo.userID = FacescSchema.user.userID) where (FacescSchema.UserConvo.ID1 =? and FacescSchema.UserConvo.ID2 =?) OR (FacescSchema.UserConvo.ID1 =? and FacescSchema.UserConvo.ID2 =?)', [userID1, userID2, userID2, userID1] ,function(err, rows, fields) {
        	if(err){
        		res.send('Erro')	
        	}
        	else{
        		if(rows.length == 0){ //create UserConvo and Convo

					connection.query('INSERT INTO FacescSchema.UserConvo SET ?', {ID1: userID1, ID2: userID2}, function(err, result) {
			  			if (err){
			  				res.send('Erro');
			  			} 
			  			else{

							var convoID = result.insertId; 
							console.log(convoID)
							

							connection.query('INSERT INTO FacescSchema.convo SET ?', {convoID: convoID, userID: userID1, message: message, date:date}, function(err, result) {
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