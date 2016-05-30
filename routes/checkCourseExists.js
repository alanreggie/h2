var mysql       = require('mysql');


module.exports = function (app){



	app.post('/checkCourseExists', function(req,res){

    var connection = mysql.createConnection({
      host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
      user     : 'alanmichaanfa',
      password : 'msft210amz*224',
      database : 'alanmichaanfacesc',
      port     : '3306',

    });

    connection.connect();

		
		var courseName = req.body.courseName;
		var courseSection = req.body.courseSection;
    var courseYear = req.body.courseYear;


    connection.query('SELECT * from FacescSchema.course where FacescSchema.course.courseName =? and FacescSchema.course.courseSection =? and FacescSchema.course.courseYear =?', [courseName, courseSection, courseYear ],function(err, rows, fields) {
        
          if(err){
            res.send(err) 
          }
          //console.log(rows)
          /////////////////////CHANGED TO >= FROM >
          if(rows.length >= 1){
            res.send('Este curso ja existe. Muda o ano ou a seção do curso! As modificacoes nao foram salvadas!')
          }
          else{
            res.send(rows);
          }

      })

      connection.end()
      
    })
}