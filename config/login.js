var LocalStrategy   = require('passport-local').Strategy;
var bCrypt      = require('bcrypt-nodejs');
var mysql       = require('mysql');

var connection = mysql.createConnection({
  host     : 'alanmichaanfacesc.cxav9nj4ox1k.sa-east-1.rds.amazonaws.com',
  user     : 'alanmichaanfa',
  password : 'msft210amz*224',
  database : 'alanmichaanfacesc',
  port     : '3306',

});
connection.connect();


module.exports = function(passport){


    
	passport.use('login', new LocalStrategy({
            usernameField : 'Email',
            passwordField : 'Password',
            passReqToCallback : true
        },
        function(req, Email, Password, done) { 

                // console.log(Email)




        var hashPass = sha256(Password); 
        console.log(hashPass)


        connection.query('SELECT * from (FacescSchema.password INNER JOIN FacescSchema.user on FacescSchema.password.userID = FacescSchema.user.userID) where FacescSchema.user.email=?',[Email], function(err, rows, fields) {
            if (err) 
                res.send(err);

            if(rows.length == 0){

                /*var user = {
                    "Message": 'O usuário não existe',
                };*/

                //res.send(user);    
                return done('O usuário não existe');
            }
            else{//user exists


                // User exists but wrong password///////////////////////////////UNCOOMMENT LINE 54 CHANGED THISSSSSSSS GOTTA CHANGE BCAK AFTA
                var salt = rows[0].salt;
                hashPass+= salt;
                //console.log(hashPass)
                //console.log(rows[0].password)


                if (rows[0].password != hashPass){
                    //console.log('Invalid Password');

                    var user = {
                        "Message": 'Invalid Password',
                    };

                    return done(null);

                    //res.send(user); 
                }

                //success
                if (rows[0].email == Email && rows[0].password == hashPass){
                    console.log('success')
                    rows[0].Message = 'Success';
                    delete rows[0].password;
                    delete rows[0].salt;


                    //rows[0].add({"Message": 'Success'})
                    /*var user = {
                        "Message": 'Success',
                        "userID": rows[0].userID,
                        "firstName": rows[0].firstName,
                        "lastName": rows[0].lastName,
                        "email": rows[0].email,
                        "userType": rows[0].userType,
                        "dateRegistered": rows[0]
                    };*/
                    console.log(rows[0])

                    return done(null, rows[0]);

                   // console.log(rows[0]);
                    //res.send(rows[0])
                }
            }
                
        });







        /*console.log(req.body)

     
        var user = {
            "userID": '32332332',
            "firstName": 'reg',
            "lastName": 'michaan',
            "email": 'emiaaal',
            "userType": 'estudante'
        };*/

        //return done(null, user);



    

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.Password);
    }
    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });




}