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


	app.post('/getReviewAverage', function(req,res){

		var courseID = req.body.courseID
		var number = req.body.number
		
        connection.query('SELECT AVG(rating' + number + ') as avg from FacescSchema.rating where courseID =?', [courseID] , function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}
        	else{
        		res.send(rows);
        	}
	    })
    })
}