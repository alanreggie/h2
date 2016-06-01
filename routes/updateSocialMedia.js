var mysql       = require('mysql');

module.exports = function (app){

	app.post('/updateSocialMedia', function(req,res){

      var connection = mysql.createConnection({
        host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
        user     : 'alanmichaanfa',
        password : 'msft210amz*224',
        database : 'alanmichaanfacesc',
        port     : '3306',

      });

      connection.connect();
  		
  		var userID = req.body.userID;
      var email = req.body.email;
      var city = req.body.city;
      var skype = req.body.skype;
      var facebook = req.body.facebook;
      var telephone = req.body.telephone;

     // console.log(userID, email, city, skype, facebook, telephone)




      connection.query('SELECT email from FacescSchema.user where email =? and userID !=?', [email, userID] , function(err, rows, fields) {
          if (err){
            res.send('Error')
          }
          console.log(rows)
          console.log(email)

          if (rows.length > 0){
              res.send('Email already exits')
          }
          else{
              connection.query('UPDATE FacescSchema.user SET ? WHERE userID =?', [{ email: email, city: city, skype: skype, phone: telephone, facebook:facebook}, userID], function(err, rows, fields) {
                if(err){
                  res.send('Error') 
                }

                  //console.log(rows, fields)
           
                  //res.send(rows);
              })

              connection.query('SELECT * from FacescSchema.user where userID =?', [userID] , function(err, rows, fields) {
                if (err){
                    res.send('Error')
                }
                res.send(rows)

              })   
          }          
      })  


      
     
      //connection.end()
    })
}