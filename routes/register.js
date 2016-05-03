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


	app.post('/register', function(req,res){
		
		var Email = req.body.Email;
		var Password = req.body.Password;
		var FirstName = req.body.FirstName;
		var LastName = req.body.LastName;

        
        var emailValid = validator.validate(Email);
        
        //if email is not email then return invalid
        if (!emailValid){
        	res.send('Email Invalido');
        }
        else{
	        	//check to see whether email exists
	        connection.query('SELECT * from user where user.email=?',[Email], function(err, rows, fields) {
	        	if(err){
	        		res.send(err)	
	        	}

	        	if(rows.length != 0){
	        		res.send('O e-mail já existe!');	
	        	}
	        	else{
	        		//email doesn't exist yet
	        		connection.query('INSERT INTO user SET ?', {userType: 5, firstName: FirstName, lastName: LastName, email:Email, dateRegistered: Date()}, function(err, result) {
			  			if (err) throw err;
			
						var userID = result.insertId; 
						var hashPass = sha256(Password);
						
						var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
						var salt = randomToken(16); 
						console.log(salt);

						hashPass += salt; 
						console.log(hashPass);
						
						connection.query('INSERT INTO password SET ?', {userID: userID, password: hashPass, salt: salt}, function(err, result) {
							if (err) throw err;


							/*var mailOptions = {
		                        from: 'administrador@facesc.com', // sender address 
		                        to: Email, // list of receivers 
		                        subject: 'Bem-vindo a Facesc, '+ FirstName + '!', // Subject line 
		                        text: '', // plaintext body 
		                        html: '<h1>O administrador esta verificando sua conta.</h1> \n Seu email/nome de usario:\n\n' + '<strong>' + Email + '</strong>'
		                    };
		                    transporter.sendMail(mailOptions, function(error, info){
		                        if(error){
		                            console.log(error);        
		                        }
		                        else{
		                            console.log('Message sent: ' + info.response);                            
		                        }
		                    });*/
							
							res.send('Bem vindo, ' + FirstName +' ' + LastName+ '. O administrador esta verificando sua conta!')
						})
					});	


	        	


	        	}
	        })
        }        
    })
}