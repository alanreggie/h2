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

	app.post('/deleteProblem', function(req,res){
		
		var ID = req.body.problemID;
        
        connection.query('DELETE FROM FacescSchema.problem where problemID=?',[ID], function (err, result) {
        	if(err){
        		res.send(err)	
        	}

        	//console.log(rows)

        	res.send(result);
	    })
    })
}