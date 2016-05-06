var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){



	app.post('/checkCourseExists', function(req,res){

		
		var courseName = req.body.courseName;
		var courseSection = req.body.courseSection;
        var courseYear = req.body.courseYear;

        connection.query({
		  sql: 'SELECT * FROM `course` WHERE `courseName` = ? and courseSection = ? and courseYear = ?',
		  timeout: 40000, // 40s 
		  values: [courseName, courseSection, courseYear]
		}, function (error, rows, fields) {

			if(error){
        		res.send(error)	
        	}

        	if(rows.length > 1){
        		res.send('Este curso ja existe. Muda o ano ou a seção do curso! As modificacoes nao foram salvadas!')
        	}
        	else{
        		res.send(rows);
        	}

        	//console.log(rows)
		});
    })
}