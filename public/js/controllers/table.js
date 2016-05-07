materialAdmin
    .controller('tableCtrl', function($filter, $sce, ngTableParams, tableService, $scope, $http) {
  
      
      $scope.changedValue = function() {
            console.log($scope.blisterPackTemplateSelected);
      }




      this.getCourseProfessors = function(selected){
              
              console.log(selected)

              
              $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getProfessorsInCourse',
                  data: {
                      'courseID': selected.courseID
                  }
            })
            .then(function(response){
                 console.log(response.data)
                 $scope.pcourses = response.data;

            
            })
      }




        this.getAllCourses = function(){

          $http({
                method: 'GET',
                url: 'http://localhost:3000/getAllCourses',
                data: {
                    
                }
           })
           .then(function(response){
                  console.log(response.data)
                  var courses = response.data;

                  $scope.courses = courses;
                  
            })
      }


       this.getCourseGrades = function(){
              
         $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getGrades',
                  data: {
                      'UserID': '250607166'
                     /* 'Email': '43432',
                      'UserID':'342432432',
                      'FirstName': '32323232',
                      'LastName': '323232',
                      'Password': '323232',*/
                      
                  }
            })
            .then(function(response){
                 console.log(response.data)

               var studentCourseGrade = response.data;

               //function AngularWayCtrl($resource) {
                  /*var vm = this;
                  $resource(users).query().$promise.then(function(users) {
                      vm.users = users;
                  });*/
                //}
               $scope.studentCourseGrade = studentCourseGrade;

            })

        }



        var data = tableService.data;
        
        //Basic Example
        this.tableBasic = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
        
        //Sorting
        this.tableSorting = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
                name: 'asc'     // initial sorting
               /* description: 'asc'*/
            }
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
    
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
        
        //Filtering
        this.tableFilter = new ngTableParams({
            page: 1,            // show first page
            count: 10
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;

                this.id = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.name = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.email = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.username = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.contact = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve(this.id, this.name, this.email, this.username, this.contact);
            }
        })
        
        //Editable
        this.tableEdit = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    

        //this.init = function(){
            //alert('test')
       // };

       this.getAllUnauth = function(){
            
            $http({
                  method: 'GET',
                  url: 'http://localhost:3000/unAuthenticatedUsersAdmin',
                  data: {
                      /*'Email': $('#registerEmail').val()*/
                  }
            })
            .then(function(response){
                 console.log(response.data)

               var users = response.data;

               //function AngularWayCtrl($resource) {
                  /*var vm = this;
                  $resource(users).query().$promise.then(function(users) {
                      vm.users = users;
                  });*/
                //}
               $scope.users = users;

            })
        };

        this.getAllUsers = function(){
            
            $http({
                  method: 'GET',
                  url: 'http://localhost:3000/allUsers',
                  data: {
                      /*'Email': $('#registerEmail').val()*/
                  }
            })
            .then(function(response){
                 console.log(response.data)

               var users = response.data;

               //function AngularWayCtrl($resource) {
                  /*var vm = this;
                  $resource(users).query().$promise.then(function(users) {
                      vm.users = users;
                  });*/
                //}
               $scope.users = users;

            })
        };

        this.updateUsers = function(user){
           // console.log(user)
            
              var e = document.getElementById("userTypeDropdown");
              var userType = e.options[e.selectedIndex].value;
              console.log(userType)
              
              if (userType == '? undefined:undefined ?'){
                userType = user.userType;
              }
              //alert(strUser)

            /*if (user.userType == 1 || user.userType == 2){
                alert('Professores: Typo 3 \nAlunos: Typo 4. \n\nNAO EXISTE: Typo ' + user.userType + '!')
                user.userType = 5;
            }*/
           // else{
                $http({
                  method: 'POST',
                  url: 'http://localhost:3000/updateUsers',
                  data: {
                      'Email': user.email,
                      'UserID': user.userID,
                      'FirstName': user.firstName,
                      'LastName': user.lastName,
                      'UserType': userType,
                      'DateRegistered': user.dateRegistered
                      }
                })
                .then(function(response){
                     console.log(response.data)
                     user.userType = userType;
                })
           // }


        }

        this.deleteUser = function(user){
            var r = confirm("Tem Certeze que quer deletar " + user.firstName + " " + user.lastName + "?");
            if (r == true) {
                //x = "Yes";
               $http({
                  method: 'POST',
                  url: 'http://localhost:3000/deleteUser',
                  data: {
                        'Email': user.email,
                        'UserID': user.userID
                      }
                })
                .then(function(response){
                     console.log(response.data)
                     user.userID = '';
                     user.email = '';
                     user.userType = '';
                     user.firstName = '';
                     user.lastName = '';
                     user.dateRegistered = '';
                     
                })
            } 
            else {
                //x = "You pressed Cancel!";
            }
           
        }

        this.deleteCourse = function(course){
            var r = confirm("Tem Certeze que quer deletar o curso: " + course.courseName + "? Tudo sobre o curso vai ser deletado para sempre.." );
            if (r == true) {
                //x = "Yes";
               $http({
                  method: 'POST',
                  url: 'http://localhost:3000/deleteCourse',
                  data: {
                        'CourseID': course.courseID
                      }
                })
                .then(function(response){
                     console.log(response.data)
                     course.courseID = '';
                     course.courseName = ''
                     course.courseYear = ''
                     course.courseSection = ''
                     course.courseDescription = ''                    
                })
            } 
            else {
                //x = "You pressed Cancel!";
            }
        }

        this.getAllCourses = function(){
            
             $http({
                  method: 'GET',
                  url: 'http://localhost:3000/getAllCourses',
                  data: {
                       
                  }
              })
              .then(function(response){
                   console.log(response.data)
                  var courses = response.data

                  $scope.courses = courses
                   
              })
        }

       this.updateCourses = function(course){

          /***********CHECK IF YEAR AND SECTION AND COURSENAME ALREADY EXISTS!!!ELSE DO BELOW*************/

              var e = document.getElementById("courseSectionDropdown");
              var courseSection = e.options[e.selectedIndex].value;

              var f = document.getElementById("courseYearDropdown");
              var courseYear = f.options[f.selectedIndex].value;

              var sectionBool = false;
              var yearBool = false;

              if (courseSection.indexOf('?') > -1){
                  sectionBool = true;
                  //courseSection = course.courseSection;
              }

              if(courseYear.indexOf('?') > -1){
                  yearBool = true;
                  //courseYear = course.courseYear;
              }

             var courseName = $('#courseName').val()
             var courseDescription = $('#courseDescription').val()

             console.log(courseName)
             console.log(courseDescription)


             if(course.courseName         ==    courseName               && 
                course.courseDescription  ==    courseDescription        &&
                sectionBool               ==    true                     &&
                yearBool                  ==    true                      ){ //nothing has changed    
                     
                     alert('nothing has changed')
                }
                else if(course.courseName         ==    courseName               && 
                        course.courseDescription  ==    courseDescription        &&
                        course.courseYear         ==    courseYear               &&
                        course.courseSection      ==    courseSection            ){//both year and section selected but not changed
                    alert('both year and section selected but not changed')
                }
                else{//something has changed

                  alert('something has changed')

                }



               /* else if(sectionBool && yearBool) {
                    alert('something other than the dropdowns have changed')
                }
                else if(sectionBool && !yearBool){
                    alert('year is changed')
                }
                else if(!sectionBool && yearBool){
                    alert('section is changed')
                }
                else if(!sectionBool && !yearBool){
                  alert('both dropdowns have changed')
                }
*/
               



                  

             /* $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getSpecificCourse',
                  data: {
                        'courseID': course.courseID,
                  }
              })
              .then(function(response){
                  $scope.currentCourse = response.data;
                  console.log(response.data)
                  //console.log($scope.currentCourse[0].courseYear)
              })



             $http({
                  method: 'POST',
                  url: 'http://localhost:3000/updateCourses',
                  data: {
                        'courseID': course.courseID,
                        'courseName': course.courseName,
                        'courseYear': courseYear,
                        'courseSection': courseSection,
                        'courseDescription': course.courseDescription
                  }
              })
              .then(function(response){
                  console.log(response.data)
              })



              //check if year and section show duplicates course, if so, revert
              $http({
                  method: 'POST',
                  url: 'http://localhost:3000/checkCourseExists',
                  data: {
                        'courseID': course.courseID,
                        'courseName': course.courseName,
                        'courseYear': courseYear,
                        'courseSection': courseSection,
                        'courseDescription': course.courseDescription
                  }
              })
              .then(function(response){
                  if (response.data.indexOf('Este') > -1){
                    //course already exists
                     $http({
                        method: 'POST',
                        url: 'http://localhost:3000/updateCourses',
                        data: {
                              'courseID': course.courseID,
                              'courseName': $scope.currentCourse[0].courseName,
                              'courseYear': $scope.currentCourse[0].courseYear,
                              'courseSection': $scope.currentCourse[0].courseSection,
                              'courseDescription': $scope.currentCourse[0].courseDescription
                        }
                    })
                    .then(function(response){
                        console.log(response.data)
                        course.courseName = $scope.currentCourse[0].courseName
                        course.courseYear = $scope.currentCourse[0].courseYear
                        course.courseSection = $scope.currentCourse[0].courseSection
                        course.courseDescription = $scope.currentCourse[0].courseDescription

                    })

                    alert(response.data)
                
                  }

                  console.log(response.data)
              })
*/


        }




      



    })


    .controller('assignType', function($filter, $sce, ngTableParams, tableService) {
        //alert('testss')

        this.init = function(){
            alert('testing')
        };
    })
