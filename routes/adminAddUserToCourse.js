var mysql       = require('mysql');
var validator = require("email-validator");
//var nodemailer = require('nodemailer');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();


module.exports = function (app){


	app.post('/addUserToCourse', function(req,res){
		
		var courseArray = req.body.courseArray;
		var userID = req.body.userID;
		var userName = req.body.userName;

		console.log(courseArray.length)
		var returnMessage = ''

		this.courseArray = courseArray;
		this.userID = userID;

		//console.log(courseArray[0])
		
		//check to see whether the professor is already in the course and don't add a duplicate
		//courseArray [i] is underfined inside SQL

			(function(){
				  var self = this;
				  // inner scope.. you can't touch me from outside!
				  var i = 0;
				  function forloop(){
				    if(i<courseArray.length){
				      			
					connection.query('SELECT * from UserCourseGrade where courseID =? and userID =?',[courseArray[i], userID], function(err, rows, fields) {
							
							if(err){
				        		console.log(err)	
				        	}
				        	console.log(i)
				        	//console.log('in')
				        	//console.log(courseArray[i])
				        	//console.log(userID)
				        	console.log(rows)
							//console.log(fields[0].name)
							//res.send(rows);

							if(rows.length >= 1){
				        		//res.send(rows)
				        		console.log(' O usuario: ' + userName + ' ja esta no curso: ' + courseArray[i] + ' e nao foi adicionado. ')
				        	}
				        	/*else{
				        		console.log('yaa')
				        	}*/
				        	else{
								connection.query('INSERT INTO UserCourseGrade SET ?', {courseID: courseArray[i], userID: userID}, function(err, result) {
									  if (err) console.log(err);

									    //returnMessage += ' O usuario: ' + userName + ' foi adicionado ao curso: ' + courseArray[0];

						        		console.log(result);

						        })
				        	}
				        	 i++; 
				        	res.send('hello')

						})

				      //console.log(i);
				     
				      setTimeout(forloop, 10); //changed this to 10
				    }
				  }
				  // call the loop to get things started..

				  forloop();
				})();

			res.send('hello')


		/*for(var i = 0; i < courseArray.length; i++){
			
			var self = this;
			
			connection.query('SELECT * from UserCourseGrade where courseID =? and userID =?',[courseArray[i], userID], function(err, rows, fields) {
					if(err){
		        		console.log(err)	
		        	}

		        	console.log(self.courseArray[i])
		        	console.log(userID)
					//console.log(fields[0].name)
					//res.send(rows);

					if(rows.length >= 1){
		        		//res.send(rows)
		        		console.log(' O usuario: ' + userName + ' ja esta no curso: ' + rows[0].courseID + 'e nao foi adicionado. ')
		        	}
		        	else{
						connection.query('INSERT INTO UserCourseGrade SET ?', {courseID: rows[0].courseID, userID: rows[0].userID}, function(err, result) {
							  if (err) console.log(err);

							    //returnMessage += ' O usuario: ' + userName + ' foi adicionado ao curso: ' + courseArray[0];

				        		console.log(result);

				        })
		        	}
		        	console.log(courseArray[i])
		        	res.send('hello')

				})


				
		}*/

         
    })
}