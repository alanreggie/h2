var mysql       = require('mysql');



module.exports = function (app){

	app.post('/deleteUser', function(req,res){

    var connection = mysql.createConnection({
      host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
      user     : 'alanmichaanfa',
      password : 'msft210amz*224',
      database : 'alanmichaanfacesc',
      port     : '3306',

    });

    connection.connect();
    		
		var Email = req.body.Email;
		var ID = req.body.UserID;
        
        connection.query('DELETE FROM FacescSchema.user where userID=?',[ID], function (err, result) {
        	if(err){
        		res.send(err)	
        	}

        	//console.log(rows)

        	res.send(result);
	    })
        connection.end()
    })
}