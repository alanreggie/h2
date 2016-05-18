
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
require('./routes/login.js')(app);
require('./routes/register.js')(app);
require('./routes/forgotPassword.js')(app);
require('./routes/unAuthenticatedUsers.js')(app);
require('./routes/updateUsers.js')(app);
require('./routes/getGrades.js')(app);
require('./routes/allUsers.js')(app);
require('./routes/adminDeleteUser.js')(app);
require('./routes/adminAddNewCourse.js')(app);
require('./routes/getAllProfessors.js')(app);
require('./routes/getAllCourses.js')(app);
require('./routes/updateCourses.js')(app);
require('./routes/checkCourseExists.js')(app);
require('./routes/getSpecificCourse.js')(app);
require('./routes/getAllStudents.js')(app);
require('./routes/adminAddUser.js')(app);
require('./routes/adminDeleteCourse.js')(app);
require('./routes/adminGetProfessorsInCourse.js')(app);
require('./routes/adminAddUserToCourse.js')(app);
require('./routes/adminGetAllStudentsAndProfessors.js')(app);
require('./routes/adminGetCoursesOfUser.js')(app);
require('./routes/adminDeleteStudentFromCourse.js')(app);
require('./routes/updateUserSummary.js')(app);
require('./routes/submitProblem.js')(app);
require('./routes/getProblems.js')(app);
require('./routes/deleteProblem.js')(app);
require('./routes/getClassMates.js')(app);
require('./routes/getStudentsInCourse.js')(app);
require('./routes/addGrade.js')(app);
require('./routes/updateGrade.js')(app);
require('./routes/deleteGrade.js')(app);
require('./routes/sendAnnouncement.js')(app);
require('./routes/getCourseAnnouncements.js')(app);




// require('./routes/getStudentsAndProfessors.js')(app);










