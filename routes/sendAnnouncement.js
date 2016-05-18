var mysql       = require('mysql');
var validator = require("email-validator");
var nodemailer = require('nodemailer');



var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();



//SMTP EMAIL ============================================
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'almichaan@gmail.com',
        pass: 'Msft210amZ*224'
    }
});


module.exports = function (app){


	app.post('/sendAnnouncement', function(req,res){
		
		var courseID = req.body.courseID;
		var userID = req.body.userID;
		var date = req.body.date;
		var subject = req.body.subject;
		var announcement = req.body.announcement;
		/*console.log(courseID)
		console.log(userID)
		console.log(date)
		console.log(subject)
		console.log(announcement)*/
        
        //insert into db, then get all the emails of everyone in the course, then 
        
		connection.query('INSERT INTO announcement SET ?', {courseID: courseID, userID: userID, date: date, subject:subject, announcement: announcement}, function(err, result) {
  			if (err){
  				res.send('error')
  			}
  			else{
  				

				connection.query('SELECT user.email from (user INNER JOIN UserCourseGrade on UserCourseGrade.userID = user.userID) where UserCourseGrade.courseID =? and user.userType in (\'Estudante\') group by user.userID order by user.userID desc', [courseID], function(err, rows, fields) {
		        	if(err){
		        		res.send('error')	
		        	}

		        	var emailList = ''
		        	for(var i = 0; i < rows.length; i++){
		        		emailList += rows[i].email + ','
		        	}

		        	var mailOptions = {
	                    from:'"Facesc 👥" <administrador@facesc.com>', // sender address 
	                    to: emailList, // list of receivers 
	                    subject: subject, // Subject line 
	                    text: '', // plaintext body 
	                    html: announcement
	                };
	                transporter.sendMail(mailOptions, function(error, info){
	                    if(error){
	                        console.log(error);        
	                    }
	                    else{
	                        console.log('Message sent: ' + info.response);                            
	                    }
               		 });



		        	//console.log(rows)

		        	res.send(rows);
			    })

  				/*var mailOptions = {
                    from: 'administrador@facesc.com', // sender address 
                    to: em, // list of receivers 
                    subject: subject, // Subject line 
                    text: '', // plaintext body 
                    html: announcement
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);        
                    }
                    else{
                        console.log('Message sent: ' + info.response);                            
                    }
                });
				
				res.send('sent')*/
  			}

			
			

				
			
		});	


	        	
		//res.send('jflkds')

	        
	        
            
    })
}