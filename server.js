
var express = require('express'),
  app       = express(),
  port      = process.env.PORT || 3000,
  expressSession = require('express-session'),
  logger      = require('morgan'),
  cookieParser  = require('cookie-parser'),
  bodyParser    = require('body-parser'),
  mysql      = require('mysql'),
  passport = require('passport'),
  randomToken = require('random-token'),
  LocalStrategy = require('passport-local').Strategy,
  sha256 = require('js-sha256');

// var multer  = require('multer')
//var upload = multer()



// EXPRESS CONFIGS ===================================
app.use(logger('dev'))
app.use(cookieParser()); 
app.use(bodyParser.json()); // get information from html forms
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}));

           

//PASSPORT ============================================
var initPassport = require('./config/init');
initPassport(passport);


//added
//app.use(bodyParser.urlencoded());
//end added

app.use(expressSession({
    secret: 'keyboard cat',
    resave: true, //added
    saveUninitialized: true, //added
    cookie: {
        httpOnly: true,
        secure: true
    },
    cookie: { 
        maxAge : 3600000
    }
}));

app.use(passport.initialize());
app.use(passport.session());



//LISTEN ==============================================
app.listen(port);
console.log('The magic happens on port ' + port);

//require('./routes/s3.js')(app); 
//require('./routes/authentication.js')(app); 
//require('./routes/login.js')(app);
require('./routes/userLogin.js')(app, passport);
require('./routes/register.js')(app);
require('./routes/forgotPassword.js')(app);
require('./routes/unAuthenticatedUsers.js')(app);
require('./routes/updateUsers.js')(app);
require('./routes/getGrades.js')(app);
require('./routes/allUsers.js')(app);
require('./routes/adminDeleteUser.js')(app);
require('./routes/adminAddNewCourse.js')(app);
require('./routes/getAllProfessors.js')(app);
require('./routes/updateCourses.js')(app);
require('./routes/checkCourseExists.js')(app);
require('./routes/getSpecificCourse.js')(app);
require('./routes/getAllStudents.js')(app);
require('./routes/adminAddUser.js')(app);
require('./routes/adminDeleteCourse.js')(app);
require('./routes/adminGetProfessorsInCourse.js')(app);
require('./routes/adminAddUserToCourse.js')(app);
require('./routes/adminGetAllStudentsAndProfessors.js')(app);
require('./routes/adminDeleteStudentFromCourse.js')(app);
require('./routes/updateUserSummary.js')(app);
require('./routes/submitProblem.js')(app);
require('./routes/getProblems.js')(app);
require('./routes/deleteProblem.js')(app);
require('./routes/getClassMates.js')(app);
require('./routes/getStudentsInCourse.js')(app);
require('./routes/getAllCourses.js')(app);
require('./routes/adminGetCoursesOfUser.js')(app);
require('./routes/addGrade.js')(app);
require('./routes/updateGrade.js')(app);
require('./routes/deleteGrade.js')(app);
require('./routes/sendAnnouncement.js')(app);
require('./routes/getCourseAnnouncements.js')(app);
require('./routes/updatePassword.js')(app);
require('./routes/submitReview.js')(app);
require('./routes/getReviewAverage.js')(app);
require('./routes/getMessages.js')(app);
require('./routes/postMessage.js')(app);
require('./routes/getUserType.js')(app);

/*var secure = express.Router();
require('./routes/postFile.js')(secure);
app.use('/', secure)*///;

// require('./routes/postFile.js')(app);


/*app.post('/upload', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  console.log(req.file)
})*/


//var upload = multer().single('avatar')

/*app.post('/upload', function (req, res) {
  
    console.log(req.body)
   

    // Everything went fine
})*/

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.post('/upload', multipartMiddleware, function(req, res) {
  console.log(req.body, req.files);
   res.send('hi')
  // don't forget to delete all req.files when done 
});







