var mysql       = require('mysql');

module.exports = function (app){


	app.post('/updateCourses', function(req,res){

    var connection = mysql.createConnection({
      host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
      user     : 'alanmichaanfa',
      password : 'msft210amz*224',
      database : 'alanmichaanfacesc',
      port     : '3306',

    });

    connection.connect();
		
		var name = req.body.courseName;
		var year = req.body.courseYear;
        var section = req.body.courseSection;
        var description = req.body.courseDescription;
        var ID = req.body.courseID;
        

        
        connection.query('UPDATE FacescSchema.course SET ? WHERE courseID = ?', [{ courseName: name, courseYear: year, courseSection:section, courseDescription:description }, ID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
        })
        connection.end()
    })
}