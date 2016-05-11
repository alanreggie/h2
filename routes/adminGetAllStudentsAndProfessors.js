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

	app.get('/getAllStudentsAndProfessors', function(req,res){
		
	


		connection.query('SELECT * from user where user.userType in (\'Professor\',\'Estudante\') group by user.userID order by user.userType =\'Professor\' desc', function(err, rows, fields) {
        
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
	    })
    })
}