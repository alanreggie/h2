var mysql       = require('mysql');

module.exports = function (app){

	app.post('/updateGrade', function(req,res){

    var connection = mysql.createConnection({
      host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
      user     : 'alanmichaanfa',
      password : 'msft210amz*224',
      database : 'alanmichaanfacesc',
      port     : '3306',
    });

    connection.connect();
		
		var gradeID = req.body.gradeID;
		var grade = req.body.grade;
        var gradeDescription = req.body.gradeDescription;     
        

        
        
        connection.query('UPDATE FacescSchema.grade SET ? WHERE gradeID = ?', [{ grade: grade, description: gradeDescription}, gradeID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}
            else{
                res.send('Updated!');
            }       	
        })
        connection.end()
    })
}