var mysql       = require('mysql');
var validator = require("email-validator");
//var nodemailer = require('nodemailer');

var connection = mysql.createConnection({
  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
  user     : 'alanmichaanfa',
  password : 'msft210amz*224',
  database : 'alanmichaanfacesc',
  port     : '3306',

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


			(function(){
				  var self = this;
				  // inner scope.. you can't touch me from outside!
				  var i = 0;
				  function forloop(){
				    if(i<courseArray.length){
				      			
					connection.query('SELECT * from FacescSchema.UserCourseGrade where courseID =? and userID =?',[courseArray[i], userID], function(err, rows, fields) {
							
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
				        	else{
								connection.query('INSERT INTO FacescSchema.UserCourseGrade SET ?', {courseID: courseArray[i], userID: userID}, function(err, result) {
									  if (err) console.log(err);

									    //returnMessage += ' O usuario: ' + userName + ' foi adicionado ao curso: ' + courseArray[0];

						        		console.log(result);

						        })
				        	}
				        	i++; 
				        	res.send('Adicionado!')

						})

				      //console.log(i);
				     
				      setTimeout(forloop, 100); //changed this to 10
				    }
				  }
				  // call the loop to get things started..

				  forloop();
				})();

				res.send('Adicionado!')
         
    })
}