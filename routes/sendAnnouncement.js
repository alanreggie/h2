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
		console.log(courseID)
		console.log(userID)
		console.log(date)
		console.log(subject)
		console.log(announcement)
        
        //insert into db, then get all the emails of everyone in the course, then 
        
		connection.query('INSERT INTO announcement SET ?', {courseID: courseID, userID: userID, date: date, subject:subject, announcement: announcement}, function(err, result) {
  			if (err){
  				res.send(err)
  			}
  			else{
  				
  				var mailOptions = {
                    from: 'administrador@facesc.com', // sender address 
                    to: 'almichaan@gmail.com', // list of receivers 
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
				
				res.send('sent')
  			}

			
			

				
			
		});	


	        	
		//res.send('jflkds')

	        
	        
            
    })
}