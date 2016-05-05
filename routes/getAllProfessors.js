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


	app.get('/getAllProfessors', function(req,res){
		
       
	        	//check to see whether email exists
	        connection.query('SELECT * from user where user.userType=?',['Professor'], function(err, rows, fields) {
	        	if(err){
	        		res.send(err)	
	        	}

	        	//if(rows.length != 0){
	        		res.send(rows);	
	        	//}
	        	
	        })
        
    })
}