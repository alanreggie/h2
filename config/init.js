var login = require('./login')
var signup = require('./signup')
var mysql       = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'FacescSchema'
});

connection.connect();


module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ')
        console.log(user)
        done(null, user.userID)
    });

    passport.deserializeUser(function(id, done) {
        //console.log(id);
        connection.query('SELECT * from user WHERE userID='+ id, function(err, rows, fields) {
            console.log(rows[0])
            done(err, rows[0])
        })
    })

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport)
    signup(passport)
}