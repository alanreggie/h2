var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){


	app.post('/updatePassword', function(req,res){

		var userID = req.body.userID;
		var password = req.body.password;
    
        	
		//send new password
		var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
		var salt = randomToken(16);
		
		//console.log(newPass)
		var newPassForStorage = sha256(password) + salt

		connection.query('DELETE FROM password WHERE userID = ' + userID, function (err, result) {
		 	if(err){
				res.send('Erro')	
			}	
			else{

				connection.query('INSERT INTO password SET ?', {userID: userID, password: newPassForStorage, salt: salt}, function(err, result) {
					if(err){
						res.send('Erro')	
					}
					else{				
						res.send('Sucesso!');
					}
				})
			}

		})

					


	        
       	   
       
	})
}
