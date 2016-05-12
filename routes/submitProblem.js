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

module.exports = function (app){


	app.post('/submitProblem', function(req,res){
		//console.log(Email)
		
		var problem = req.body.problem;
		var userID = req.body.userID;
		var date = req.body.date;


       	
		connection.query('INSERT INTO problem SET ?', {resolved: 0, dateSubmitted: date, problemDescription: problem, userID: userID}, function(err, result) {
			if (err) throw err;

			res.send(result)
			
		})
    })
}