var mysql       = require('mysql');

module.exports = function (app){


	app.post('/getMessages', function(req,res){

    var connection = mysql.createConnection({
      host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
      user     : 'alanmichaanfa',
      password : 'msft210amz*224',
      database : 'alanmichaanfacesc',
      port     : '3306',

    });

    connection.connect();
		
		var userID1 = req.body.user1
		var userID2 = req.body.user2
		

        connection.query('SELECT * from ((FacescSchema.UserConvo INNER JOIN FacescSchema.convo on FacescSchema.convo.convoID = FacescSchema.UserConvo.convoID) INNER JOIN FacescSchema.user on FacescSchema.convo.userID = FacescSchema.user.userID) where (FacescSchema.UserConvo.ID1 =? and FacescSchema.UserConvo.ID2 =?) OR (FacescSchema.UserConvo.ID1 =? and FacescSchema.UserConvo.ID2 =?)', [userID1, userID2, userID2, userID1] ,function(err, rows, fields) {
        	if(err){
        		res.send('Erro')	
        	}
        	else{
        		res.send(rows);	

        	}

        	

        	
	    })
        connection.end()
    })
}