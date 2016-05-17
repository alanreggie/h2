var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){


	app.post('/updateGrade', function(req,res){
		
		var gradeID = req.body.gradeID;
		var grade = req.body.grade;
        var gradeDescription = req.body.gradeDescription;     
        
        connection.query('UPDATE grade SET ? WHERE gradeID = ?', [{ grade: grade, description: gradeDescription}, gradeID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}
            else{
                res.send('Updated!');
            }       	
        })
    })
}