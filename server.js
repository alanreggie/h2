
var express = require('express'),
  app       = express(),
  port      = process.env.PORT || 3000,
  expressSession = require('express-session'),
  logger      = require('morgan'),
  cookieParser  = require('cookie-parser'),
  bodyParser    = require('body-parser'),
  mysql      = require('mysql')
  sha256 = require('js-sha256');

  var randomToken = require('random-token');


  /*passport = require('passport');*/

// EXPRESS CONFIGS ===================================
app.use(logger('dev'))
app.use(cookieParser()); 
app.use(bodyParser.json()); // get information from html forms
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}));

//PASSPORT ============================================
/*var initPassport = require('./config/init');
initPassport(passport);
*/
/*app.use(expressSession({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: true,
        secure: true
    },
    cookie: { 
        maxAge : 3600000
    }
}));
*/
/*app.use(passport.initialize());
app.use(passport.session());
*/
//LISTEN ==============================================
app.listen(port);
console.log('The magic happens on port ' + port);

//require('./routes/s3.js')(app); 
//require('./routes/authentication.js')(app); 
//require('./routes/auth.js')(app);
//require('./routes/register.js')(app);
//require('./routes/forgotPassword.js')(app);
require('./routes/unAuthenticatedUsers.js')(app);
require('./routes/updateUsers.js')(app);







