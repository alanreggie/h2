var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){

	app.post('/deleteGrade', function(req,res){
		
		var courseID = req.body.courseID
		var userID = req.body.userID
		var gradeID = req.body.gradeID
        
        connection.query('DELETE FROM grade where gradeID =?',[gradeID], function (err, result) {
        	if(err){
        		res.send('error')	
        	}
        	else{
        		res.send('success');
        	}        	
	    })

    })
}