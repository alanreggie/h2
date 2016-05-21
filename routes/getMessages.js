var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){


	app.post('/getMessages', function(req,res){
		
		var userID1 = req.body.user1
		var userID2 = req.body.user2
		

        connection.query('SELECT * from ((UserConvo INNER JOIN convo on convo.convoID = UserConvo.convoID) INNER JOIN user on convo.userID = user.userID) where (UserConvo.ID1 =? and UserConvo.ID2 =?) OR (UserConvo.ID1 =? and UserConvo.ID2 =?)', [userID1, userID2, userID2, userID1] ,function(err, rows, fields) {
        	if(err){
        		res.send('Erro')	
        	}
        	else{
        		res.send(rows);	

        	}

        	

        	
	    })
    })
}