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

	app.post('/deleteGrade', function(req,res){
		
		var courseID = req.body.courseID
		var userID = req.body.userID
		var gradeID = req.body.gradeID
        
        connection.query('DELETE FROM FacescSchema.grade where gradeID =?',[gradeID], function (err, result) {
        	if(err){
        		res.send('error')	
        	}
        	else{
        		res.send('success');
        	}        	
	    })

    })
}