var mysql       = require('mysql');

var connection = mysql.createConnection({
  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
  user     : 'alanmichaanfa',
  password : 'msft210amz*224',
  database : 'alanmichaanfacesc',
  port     : '3306',

});


connection.connect();

module.exports = function (app){


	app.post('/updateUserSummary', function(req,res){
		
		var summary = req.body.summary;
        var userID = req.body.userID;

		
        

        
        connection.query('UPDATE FacescSchema.user SET ? WHERE userID = ?', [{ summary: summary}, userID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(summary);
        })
    })
}