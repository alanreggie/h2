var mysql       = require('mysql');


module.exports = function (app){

	app.get('/allUsers', function(req,res){

    var connection = mysql.createConnection({
      host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
      user     : 'alanmichaanfa',
      password : 'msft210amz*224',
      database : 'alanmichaanfacesc',
      port     : '3306',

    });


    connection.connect();
		
		var Email = req.body.Email;
		var Password = req.body.Password;
        
        connection.query('SELECT * from FacescSchema.user where FacescSchema.user.userType !=?', ['Nenhum'], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	//console.log(rows)

        	res.send(rows);
	    })
        connection.end()
    })
}