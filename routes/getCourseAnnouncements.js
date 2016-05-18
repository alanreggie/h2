var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){



	app.post('/getCourseAnnouncements', function(req,res){

		var courseID = req.body.courseID;

		
		var courseID = req.body.courseID;
		connection.query('SELECT * from announcement where courseID =? group by date asc', [courseID], function(err, rows, fields) {
        	if(err){
        		res.send('error')	
        	}

        	console.log(rows)

        	res.send(rows);
	    })
        
    })
}