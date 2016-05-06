var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){


	app.post('/updateCourses', function(req,res){
		
		var name = req.body.courseName;
		var year = req.body.courseYear;
        var section = req.body.courseSection;
        var description = req.body.courseDescription;
        var ID = req.body.courseID;
        

        
        connection.query('UPDATE course SET ? WHERE courseID = ?', [{ courseName: name, courseYear: year, courseSection:section, courseDescription:description }, ID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
        })
    })
}