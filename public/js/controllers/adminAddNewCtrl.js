materialAdmin

    // =========================================================================
    // Controller for adding new users and courses
    // =========================================================================
    
    .controller('adminAddNewCtrl', function($scope, $http, $window){
    	

		this.submitCourse = function(){
				
			/*var selectedProfArr = []; 
			$('#adminChosenProfessors :selected').each(function(i, selected){ 
			 	console.log($(selected).text())
			  selectedProfArr[i] = $(selected).text(); 
			});*/

			var courseDescription = $('#courseDescription').val()
			var courseName = $('#courseName').val()
			var courseSection = $('#courseSection').val()


			var e = document.getElementById("courseYear");
            var year = e.options[e.selectedIndex].value;


			/*console.log(courseDescription)
			console.log(courseName)
			console.log(courseSection)
			console.log(year)*/



			if(courseDescription && courseName &&  courseSection && year){ 
				

				//check to see whether the course exists
				$http({
	                  method: 'POST',
	                  url: 'http://localhost:3000/checkCourseExists',
	                  data: {
	                      'courseName': courseName,
	                      'courseSection': courseSection,
	                      'courseYear':year
	                  }
	             })
	              .then(function(response){
	                    console.log(response.data)
	                    if (response.data.indexOf('Este') > -1){
	                    	$('#courseResponseMessage').text( "O curso ja existe!" )
	                    }
	                    else{
	                    	$http({
				                  method: 'POST',
				                  url: 'http://localhost:3000/adminAddNewCourse',
				                  data: {
				                      'CourseName': courseName,
				                      'CourseDescription': courseDescription,
				                      'CourseSection': courseSection,
				                      'CourseYear': year
				                	}
				             })
				             .then(function(response){
				                   console.log(response.data)
				                   $('#courseResponseMessage').text( "O curso foi adicionado!" )
				             })
	                    }
	             })
			}
			else{
				 $('#courseResponseMessage').text( 'Prenche todos os campos do formulario.' )
			}
		}





		this.getAllProfessors = function(){

			$http({
                  method: 'GET',
                  url: 'http://localhost:3000/getAllProfessors',
                  data: {
                      
                  }
             })
             .then(function(response){
                    console.log(response.data)
                    var professors = response.data;
                    $scope.professors = professors;
              })
		}

		this.reload = function(){
			$window.location.reload();
		}

		this.getAllStudents = function(){

			$http({
                  method: 'GET',
                  url: 'http://localhost:3000/getAllStudents',
                  data: {
                      
                  }
             })
             .then(function(response){
                    console.log(response.data)
                    var students = response.data;
                    $scope.students = students;
                    
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


		this.submitUser = function(){
			var userFirstName = $('#userFirstName').val()
			var userLastName = $('#userLastName').val()
			var userEmail = $('#userEmail').val()


			var e = document.getElementById("userTypeDropdown");
            var type = e.options[e.selectedIndex].value;

                    /*console.log(userFirstName)
                    console.log(userLastName)
                    console.log(type)


*/
                    console.log(userEmail)

            if(userFirstName && userLastName &&  userEmail && type){ 
            		//check to see whther email exists, then..


            		$http({
		                  method: 'POST',
		                  url: 'http://localhost:3000/adminAddUser',
		                  data: {
		                      'Email': userEmail,
		                      'FirstName': userFirstName,
		                      'LastName': userLastName,
		                      'Type': type
		                	}
		             })
		             .then(function(response){
		                   console.log(response.data)
		                   $('#addStudentResponseMessage').text( response.data )
		             })



            }
            else{
            	$('#addStudentResponseMessage').text( 'Prenche todos os campos do formulario.' )
            }


		}




    })
