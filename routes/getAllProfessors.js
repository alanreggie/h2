var mysql       = require('mysql');
var validator = require("email-validator");


module.exports = function (app){


	app.get('/getAllProfessors', function(req,res){		

			var connection = mysql.createConnection({
			  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
			  user     : 'alanmichaanfa',
			  password : 'msft210amz*224',
			  database : 'alanmichaanfacesc',
			  port     : '3306',

			});

			connection.connect();
       
	        	//check to see whether email exists
	        connection.query('SELECT * from FacescSchema.user where FacescSchema.user.userType=?',['Professor'], function(err, rows, fields) {
	        	if(err){
	        		res.send(err)	
	        	}

	        	//if(rows.length != 0){
	        		res.send(rows);	
	        	//}
	        	
	        })

	        connection.end()
    })
}