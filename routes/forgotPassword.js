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


	app.post('/forgotPassword', function(req,res){

		var connection = mysql.createConnection({
		  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
		  user     : 'alanmichaanfa',
		  password : 'msft210amz*224',
		  database : 'alanmichaanfacesc',
		  port     : '3306',

		});

		connection.connect();

		var Email = req.body.Email;
		//console.log(Email)
		        
        var emailValid = validator.validate(Email);
        
        //if email is not email then return invalid
        if (!emailValid){
        	res.send('Email Invalido');
        }
        else{
        	 connection.query('SELECT * from FacescSchema.user where FacescSchema.user.email=?',[Email], function(err, rows, fields) {
	        	if(err){
	        		res.send(err)	
	        	}

	        	if(rows.length == 0){
	        		res.send('O e-mail nao existe!');	
	        	}
	        	else{//email exists

	        		//send new password
	        		var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
					var newPass = randomToken(16);
					var salt = randomToken(16);

					console.log(newPass)
					newPassForStorage = sha256(newPass) + salt
					var userID = rows[0].userID;

					connection.query('DELETE FROM FacescSchema.password WHERE userID = ' + userID, function (err, result) {
					 	if(err){
	        				res.send(err)	
	        			}	

	        			connection.query('INSERT INTO FacescSchema.password SET ?', {userID: userID, password: newPassForStorage, salt: salt}, function(err, result) {
	        				if(err){
	        					res.send(err)	
	        				}
	        				else{

	        					 //email newPass then update database

								var mailOptions = {
			                        from: 'administrador@facesc.com', // sender address 
			                        to: Email, // list of receivers 
			                        subject: 'Senha Nova Facesc!✔', // Subject line 
			                        text: 'Sua nova senha:' + newPass, // plaintext body 
			                        html: '<h1>Uma mensagem do time Facesc.</h1> \n Sua senha nova :\n\n' + '<strong>' + newPass + '</strong>'
			                    };
			                    transporter.sendMail(mailOptions, function(error, info){
			                        if(error){
			                            console.log(error);        
			                        }
			                        else{
			                            console.log('Message sent: ' + info.response);                            
			                        }
			                    });

	        					
	        					res.send('A senha nova foi manadada para o seu email');
	        				}
	        			})
					})
	        	}
       	    })
        }
        connection.end()
	})
}
