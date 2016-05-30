var mysql       = require('mysql');

module.exports = function (app){



	app.post('/getCourseAnnouncements', function(req,res){


    var connection = mysql.createConnection({
      host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
      user     : 'alanmichaanfa',
      password : 'msft210amz*224',
      database : 'alanmichaanfacesc',
      port     : '3306',

    });

    connection.connect();

		var courseID = req.body.courseID;

		
		var courseID = req.body.courseID;
		connection.query('SELECT * from FacescSchema.announcement where courseID =? group by date asc', [courseID], function(err, rows, fields) {
        	if(err){
        		res.send('error')	
        	}

        	console.log(rows)

        	res.send(rows);
	   })
      
     connection.end()
    
    })
}