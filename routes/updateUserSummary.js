var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){


	app.post('/updateUserSummary', function(req,res){
		
		var summary = req.body.summary;
        var userID = req.body.userID;

		
        

        
        connection.query('UPDATE user SET ? WHERE userID = ?', [{ summary: summary}, userID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(summary);
        })
    })
}