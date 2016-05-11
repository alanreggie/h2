var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();




module.exports = function (app){

/*connection.query('SELECT * from (password INNER JOIN user on password.userID = user.userID) where user.email=?',['alan'] , function(err, rows, fields) { //WHERE user.email=?',['alan']
	console.log(rows[0])
})*/
/*var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
var token = randomToken(16); // example output → '3ZGErMDCwxTOZYFp' 
console.log(token)*/

	app.post('/userlogin', function(req,res){
		
		var Email = req.body.Email;
		var Password = req.body.Password;
        
        var hashPass = sha256(Password); 
        console.log(hashPass)


		connection.query('SELECT * from (password INNER JOIN user on password.userID = user.userID) where user.email=?',[Email], function(err, rows, fields) {
			if (err) 
				res.send(err);

			if(rows.length == 0){

				var user = {
					"Message": 'O usuário não existe',
				};

				res.send(user);    
			}
			else{//user exists


				// User exists but wrong password
				var salt = rows[0].salt;
				hashPass+= salt;

				if (rows[0].password != hashPass){
					console.log('Invalid Password');

					var user = {
						"Message": 'Invalid Password',
					};

					res.send(user); 
				}


				//success
				if (rows[0].email == Email && rows[0].password == hashPass){
					console.log('success')
					rows[0].Message = 'Success';
					delete rows[0].password;
					delete rows[0].salt;


					//rows[0].add({"Message": 'Success'})
					/*var user = {
						"Message": 'Success',
						"userID": rows[0].userID,
						"firstName": rows[0].firstName,
						"lastName": rows[0].lastName,
						"email": rows[0].email,
						"userType": rows[0].userType,
						"dateRegistered": rows[0]
					};*/


					console.log(rows[0]);
					res.send(rows[0])
				}
			}
				
		});
	})
}