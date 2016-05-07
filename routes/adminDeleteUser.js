var mysql       = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'FacescSchema'
});

connection.connect();

module.exports = function (app){

	app.post('/deleteUser', function(req,res){
		
		var Email = req.body.Email;
		var ID = req.body.UserID;
        
        connection.query('DELETE FROM user where userID=?',[ID], function (err, result) {
        	if(err){
        		res.send(err)	
        	}

        	//console.log(rows)

        	res.send(result);
	    })
    })
}