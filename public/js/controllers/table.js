materialAdmin
    .controller('tableCtrl', function($filter, $sce, ngTableParams, tableService, $scope, $http, $sessionStorage) {
      
      this.getCourseAnnouncements = function(course){
           $http({
                    method: 'POST',
                    url: 'http://localhost:3000/getCourseAnnouncements',
                    data: {
                        'courseID': course.courseID,
                    }
              })
              .then(function(response){
                  $scope.annoucements = response.data;
                  // console.log(response.data)   
              })
      }
      
      this.updateGrade = function(grade){
        console.log(grade)
              $http({
                    method: 'POST',
                    url: 'http://localhost:3000/updateGrade',
                    data: {
                        'gradeID': grade.gradeID,
                        'grade': grade.grade,
                        'gradeDescription': grade.description
                    }
              })
              .then(function(response){
                  // console.log(response.data)   
              })
      }


      this.deleteGrade = function(grade){
              
          $http({
                method: 'POST',
                url: 'http://localhost:3000/deleteGrade',
                data: {
                    'gradeID': grade.gradeID,
                    'courseID': grade.courseID,
                    'userID': grade.userID
                }
          })
          .then(function(response){
             if(response.data.indexOf("success") > -1){
                   grade.firstName = ''
                   grade.lastName = ''
                   grade.grade = ''
                   grade.description = ''
             }              
          })
      }


      
      this.deleteProblem = function(problem){
                  

                
      }


      this.getProblems = function (){
          $http({
                  method: 'GET',
                  url: 'http://localhost:3000/getProblems',
                  data: {
                      /*'Email': $('#registerEmail').val()*/
                  }
            })
            .then(function(response){
                 console.log(response.data)

                var problems = response.data;
                $scope.problems = problems;

            })
      }


       this.deleteUserFromCourseCourseSelect = function(user){
        console.log(user.userID)
        console.log($scope.selectedCourse)

            var r = confirm("Tem certeza que quer deletar " + user.firstName + " " + user.lastName + " do curso " + $scope.selectedCourse.courseID + " -- " + $scope.selectedCourse.courseSection + " -- " + $scope.selectedCourse.courseName + " ?");
            if (r == true) {
               $http({
                        method: 'POST',
                        url: 'http://localhost:3000/deleteStudentFromCourse',
                        data: {
                            'userID': user.userID,
                            'courseID': $scope.selectedCourse.courseID
                        }
                  })
                  .then(function(response){
                       console.log(response.data)
                       user.userID = ''
                       user.userType = ''
                       user.firstName = ''
                       user.lastName = ''
                       user.email = ''

                  
                  })
          }

      }



      this.deleteUserFromCourseUserSelect = function(course){
        console.log(course.courseID)
        console.log($scope.selectedUser)

            var r = confirm("Tem certeza que quer deletar " + $scope.selectedUser.firstName + " " + $scope.selectedUser.lastName + " do curso " + course.courseID + " -- " + course.courseSection + " -- " + course.courseName + " ?");
            if (r == true) {
               $http({
                        method: 'POST',
                        url: 'http://localhost:3000/deleteStudentFromCourse',
                        data: {
                            'userID': $scope.selectedUser.userID,
                            'courseID': course.courseID
                        }
                  })
                  .then(function(response){
                       console.log(response.data)
                       course.courseID = ''
                       course.courseYear = ''
                       course.courseSection = ''
                       course.courseName = ''
                  
                  })
          }

      }


      this.getCoursesOfUser = function(selected){
          $scope.selectedUser = selected;
              $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getCoursesOfUser',
                  data: {
                      'userID': selected.userID
                  }
            })
            .then(function(response){
                 console.log(response.data)
                 $scope.courses = response.data;

            
            })
      }



      this.getAllStudentsAndProfessors = function(){
            $http({
                  method: 'GET',
                  url: 'http://localhost:3000/getAllStudentsAndProfessors',
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
      }


      $scope.changedValue = function() {
            console.log($scope.blisterPackTemplateSelected);
      }




      this.getCourseUsers = function(selected){
              
              console.log(selected)
              $scope.selectedCourse = selected;
              
              $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getProfessorsInCourse',
                  data: {
                      'courseID': selected.courseID
                  }
            })
            .then(function(response){
                 //console.log(response.data)
                 $scope.pcourses = response.data;

            
            })
      }

      this.getCourseStudents = function (selected){
           console.log(selected)
              $scope.selectedCourse = selected;
              
              $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getStudentsInCourse',
                  data: {
                      'courseID': selected.courseID
                  }
            })
            .then(function(response){
                 //console.log(response.data)
                 $scope.pcourses = response.data;

            
            })
      }


      this.getStudentGradesInCourse = function(student){
          console.log($scope.selectedCourse.courseID)
          console.log(student.userID)


              $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getGrades',
                  data: {
                      'courseID': $scope.selectedCourse.courseID,
                      'UserID': student.userID
                  }
            })
            .then(function(response){
                 console.log(response.data)
                 $scope.pgrades = response.data;

            
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



      this.getCoursesOfStudent = function(){
          
          var user = JSON.parse($sessionStorage.user);
          var userID = user.userID; 

          //$scope.selectedUser = selected;
              $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getCoursesOfUser',
                  data: {
                      'userID': userID
                  }
            })
            .then(function(response){
                 console.log(response.data)
                 $scope.courses = response.data;

            
            })
      }


       this.getCourseGrades = function(course){
          

          var user = JSON.parse($sessionStorage.user);
          var userID = user.userID; 
          console.log(userID)
          console.log(course)

           $http({
                  method: 'POST',
                  url: 'http://localhost:3000/getGrades',
                  data: {
                      'UserID': userID,
                      'courseID': course.courseID
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
            var r = confirm("Tem certeza que quer deletar " + user.firstName + " " + user.lastName + "?");
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
              //user.apple = false
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

       /* this.yearChanged = function(course, yearVal){
          $scope.course.year = yearVal;
          console.log(course)
        }*/

       this.updateCourses = function(course){

            /*if oyu make ng-model w.year it will update to the year that is selected*/
            /*so change ng-model to somehting like "hello" and it will store the original value*/
            /*you can compare the original value to the changed ajax one */
            /*in a text box  its the samething!!*/

              var e = document.getElementById("courseSectionDropdown");
              var courseSection = e.options[e.selectedIndex].value;

              var f = document.getElementById("courseYearDropdown");
              var courseYear = f.options[f.selectedIndex].value;

              console.log(courseYear)
              console.log(course.courseYear)


             /* console.log(courseSection)
              console.log(course.courseSection)*/

              var sectionBool = false;
              var yearBool = false;

              if (courseSection.indexOf('?') > -1){
                  sectionBool = true;
                  courseSection = course.courseSection;
              }

              if(courseYear.indexOf('?') > -1){
                  yearBool = true;
                  courseYear = course.courseYear 
              }


             /*var courseName = $('#courseName').val()
             var courseDescription = $('#courseDescription').val()*/

            /* console.log(courseName)
             console.log(course.courseName)*/

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
                    alert('Este curso ja existe!')

                  }
                  else{
                          $http({
                              method: 'POST',
                              url: 'http://localhost:3000/updateCourses',
                              data: {
                                    'courseID': course.courseID,
                                    'courseName': course.courseName,
                                    'courseYear': course.courseYear,
                                    'courseSection': course.courseSection,
                                    'courseDescription': course.courseDescription
                                  }
                          })
                          .then(function(response){
                             console.log(response.data)
                          })  
            
                  }
              })

                  

            



             
             //var courseDescription = $('#courseDescription').val()

             //console.log(courseName)
            // console.log(courseDescription)
             //console.log(course)
}

            /* if(course.courseName         ==    courseName               && 
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

                }*/



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


       // }




      



    })//end of controller

    .controller('assignType', function($filter, $sce, ngTableParams, tableService) {
        //alert('testss')

        this.init = function(){
            alert('testing')
        };
    })
