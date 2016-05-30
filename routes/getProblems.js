var mysql       = require('mysql');

module.exports = function (app){


	app.get('/getProblems', function(req,res){
                 
        var connection = mysql.createConnection({
          host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
          user     : 'alanmichaanfa',
          password : 'msft210amz*224',
          database : 'alanmichaanfacesc',
          port     : '3306',

        });

        connection.connect(); 

        connection.query('SELECT * from (FacescSchema.problem INNER JOIN FacescSchema.user on FacescSchema.problem.userID = FacescSchema.user.userID) where FacescSchema.problem.resolved = 0',function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	//console.log(rows)

        	res.send(rows);
	    })
        connection.end()
    })
}