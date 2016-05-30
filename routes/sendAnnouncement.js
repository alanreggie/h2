var mysql       = require('mysql');
var validator = require("email-validator");
var nodemailer = require('nodemailer');

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

		var connection = mysql.createConnection({
		  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
		  user     : 'alanmichaanfa',
		  password : 'msft210amz*224',
		  database : 'alanmichaanfacesc',
		  port     : '3306',

		});

		connection.connect();
		
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
               
		connection.query('INSERT INTO FacescSchema.announcement SET ?', {courseID: courseID, userID: userID, date: date, subject:subject, announcement: announcement}, function(err, result) {
  			if (err){
  				res.send('error')
  			}
  			else{
  				

				connection.query('SELECT FacescSchema.user.email from (FacescSchema.user INNER JOIN FacescSchema.UserCourseGrade on FacescSchema.UserCourseGrade.userID = FacescSchema.user.userID) where FacescSchema.UserCourseGrade.courseID =? and FacescSchema.user.userType in (\'Estudante\', \'Professor\') group by FacescSchema.user.userID order by FacescSchema.user.userID desc', [courseID], function(err, rows, fields) {
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

		        	res.send('hello');
			    })

  				
  			}
		});	
			        
	    connection.end()
            
    })
}