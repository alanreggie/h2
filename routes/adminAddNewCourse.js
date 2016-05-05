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


	app.post('/adminAddNewCourse', function(req,res){
		
		var courseName = req.body.CourseName;
		var courseDescription = req.body.CourseDescription;
		var professorsArr = req.body.Professors;
		console.log(professorsArr)
		

        
        //var emailValid = validator.validate(Email);
        
        //if email is not email then return invalid
        //if (!emailValid){
        	res.send('Email Invalido');
        //}
        //else{
	        	//check to see whether email exists
	       /* connection.query('SELECT * from user where user.email=?',[Email], function(err, rows, fields) {
	        	if(err){
	        		res.send(err)	
	        	}

	        	if(rows.length != 0){
	        		res.send('O e-mail já existe!');	
	        	}
	        	else{
	        		//email doesn't exist yet
	        		connection.query('INSERT INTO user SET ?', {userType: 'Nenhum', firstName: FirstName, lastName: LastName, email:Email, dateRegistered: Date()}, function(err, result) {
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

							
							res.send('Bem vindo, ' + FirstName +' ' + LastName+ '. O administrador esta verificando sua conta!')
						})
					});	


	        	


	        	}
	        })*/
        //}        
    })
}