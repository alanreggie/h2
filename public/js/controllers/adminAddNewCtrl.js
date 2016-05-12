materialAdmin

    // =========================================================================
    // Controller for adding new users and courses
    // =========================================================================
    
    .controller('adminAddNewCtrl', function($scope, $http, $window, $sessionStorage, $state){
    	
    	this.submitProblem = function(){
    		
			var problem = $('#problem').val()
			var user = JSON.parse($sessionStorage.user);
          	var userID = user.userID; 

    		$http({
                  method: 'POST',
                  url: 'http://localhost:3000/submitProblem',
                  data: {
                      'problem': problem,
                      'userID': userID,
                      'date': Date()
                  }
	             })
	              .then(function(response){
	                    console.log(response.data)
	                    $state.go('student')

	             })
    		}



    	this.submitStudentToCourses = function(){

    		var selectedCourseArr = []; 
			$('#adminChosenCourses :selected').each(function(i, selected){ 
			 	//console.log($(selected).text())
			  selectedCourseArr[i] = $(selected).text(); 
			});
			//console.log(selectedCourseArr)

			var e = document.getElementById("adminChosenStudent");
            var student = e.options[e.selectedIndex].text;
           // console.log(professor)

           	var userName = student.split(" ")[2] + ' ' + student.split(" ")[3]
            var studentID = student.split(" ")[0];
            console.log(student)


            var courseIDArray = []
            for (i = 0; i < selectedCourseArr.length; i++){
            	courseIDArray.push(selectedCourseArr[i].split(" ")[0])  ;
            }
            //console.log(courseIDArray)

            //check whether professor is already in the course, then

            if(student != '' && courseIDArray.length > 0 ){
            	
            	$http({
	                  method: 'POST',
	                  url: 'http://localhost:3000/addUserToCourse',
	                  data: {
	                      'courseArray': courseIDArray,
	                      'userID': studentID,
	                      'userName': userName
	                  }
	             })
	              .then(function(response){
	                    console.log(response.data)
	               		$('#studentToCourseResponseMessage').text( response.data )   
	             })


            }

    	}





    	this.submitProfessorToCourses = function(){
    		
    		var selectedCourseArr = []; 
			$('#adminChosenCourses :selected').each(function(i, selected){ 
			 	//console.log($(selected).text())
			  selectedCourseArr[i] = $(selected).text(); 
			});
			//console.log(selectedCourseArr)

			var e = document.getElementById("adminChosenProfessor");
            var professor = e.options[e.selectedIndex].text;
           // console.log(professor)

           	var userName = professor.split(" ")[1] + ' ' + professor.split(" ")[2]
            var professorID = professor.split(" ")[0];
            console.log(professor)


            var courseIDArray = []
            for (i = 0; i < selectedCourseArr.length; i++){
            	courseIDArray.push(selectedCourseArr[i].split(" ")[0])  ;
            }
            //console.log(courseIDArray)

            //check whether professor is already in the course, then

            if(professor != '' && courseIDArray.length > 0 ){
            	
            	$http({
	                  method: 'POST',
	                  url: 'http://localhost:3000/addUserToCourse',
	                  data: {
	                      'courseArray': courseIDArray,
	                      'userID': professorID,
	                      'userName': userName
	                  }
	             })
	              .then(function(response){
	                    console.log(response.data)
	               		$('#professorToCourseResponseMessage').text( response.data )

	                    
	                   
	             })
            }
    	}



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
