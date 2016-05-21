var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){


	app.post('/getReviewAverage', function(req,res){

		var courseID = req.body.courseID
		var number = req.body.number
		
        connection.query('SELECT AVG(rating' + number + ') as avg from rating where courseID =?', [courseID] , function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}
        	else{
        		res.send(rows);
        	}
	    })
    })
}