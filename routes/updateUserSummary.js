var mysql       = require('mysql');

module.exports = function (app){

	app.post('/updateUserSummary', function(req,res){

      var connection = mysql.createConnection({
        host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
        user     : 'alanmichaanfa',
        password : 'msft210amz*224',
        database : 'alanmichaanfacesc',
        port     : '3306',

      });

      connection.connect();
  		
  		var summary = req.body.summary;
      var userID = req.body.userID;
      //console.log(summary, userID)


      connection.query('UPDATE FacescSchema.user SET ? WHERE userID =?', [{ summary: summary}, userID], function(err, rows, fields) {
      	if(err){
      		res.send(err)	
      	}

      	//console.log(rows, fields)
 
      	//res.send(rows);
      })
/*
      connection.query('INSERT INTO FacescSchema.user SET ? WHERE userID =? ', [{summary: summary}, userID], function(err, result) {
        if (err) console.log(err)
      })*/



      connection.query('SELECT * from FacescSchema.user where userID =? ', [userID] ,  function(err, rows, fields) {
          res.send(rows)
          //console.log(rows)
      })

      connection.end()
    })
}