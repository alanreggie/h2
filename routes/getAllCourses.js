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

	app.get('/getAllCourses', function(req,res){
		
        connection.query('SELECT * from course order by course.courseID', function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
	    })
    })
}