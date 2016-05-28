var mysql       = require('mysql');
var validator = require("email-validator");
var nodemailer = require('nodemailer');

var connection = mysql.createConnection({
  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
  user     : 'alanmichaanfa',
  password : 'msft210amz*224',
  database : 'alanmichaanfacesc',
  port     : '3306',

});


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'facesc.gerente@gmail.com',
        pass: 'F@C35c28!'
    }
});



connection.connect();

module.exports = function (app){


	app.post('/submitProblem', function(req,res){
		//console.log(Email)
		
		var problem = req.body.problem;
		var userID = req.body.userID;
		var date = req.body.date;


       	
		connection.query('INSERT INTO FacescSchema.problem SET ?', {resolved: 0, dateSubmitted: date, problemDescription: problem, userID: userID}, function(err, result) {
			if (err) throw err;

					var mailOptions = {
	                    from:'"Facesc 👥" <administrador@facesc.com>', // sender address 
	                    to: 'almichaan@gmail.com', // list of receivers 
	                    subject: userID, // Subject line 
	                    text: '', // plaintext body 
	                    html: problem
	                };
	                transporter.sendMail(mailOptions, function(error, info){
	                    if(error){
	                        console.log(error);        
	                    }
	                    else{
	                        console.log('Message sent: ' + info.response);                            
	                    }
               		 });





			res.send(result)
			
		})
    })
}