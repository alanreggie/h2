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

/*connection.query('SELECT * from (password INNER JOIN user on password.userID = user.userID) where user.email=?',['alan'] , function(err, rows, fields) { //WHERE user.email=?',['alan']
	console.log(rows[0])
})*/
/*var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
var token = randomToken(16); // example output → '3ZGErMDCwxTOZYFp' 
console.log(token)*/

	app.post('/updateUsers', function(req,res){
		
		var email = req.body.Email;
		var userID = req.body.UserID;
        var userType = req.body.UserType;
        var firstName = req.body.FirstName;
        var lastName = req.body.LastName;
        var date = req.body.DateRegistered;



        connection.query('UPDATE FacescSchema.user SET ? WHERE userID = ?', [{ firstName: firstName, lastName: lastName, email:email, userType:userType, dateRegistered:date }, userID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
        })


       /* connection.query('UPDATE user SET (firstName = ?, lastName = ?) WHERE UserID = ?', [firstName, lastName, userID], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);

        })

*/


        /*connection.query('SELECT * from user where userType=?',[5], function(err, rows, fields) {
        	if(err){
        		res.send(err)	
        	}

        	console.log(rows)

        	res.send(rows);
	    })*/
    })
}