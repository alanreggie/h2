materialAdmin

    // =========================================================================
    // Controller for adding new users and courses
    // =========================================================================
    
    .controller('adminAddNewCtrl', function($scope, $http, $window){
    	

		this.submitCourse = function(){
				
			var selectedProfArr = []; 
			$('#adminChosenProfessors :selected').each(function(i, selected){ 
			 	console.log($(selected).text())
			  selectedProfArr[i] = $(selected).text(); 
			});

			var courseDescription = $('#courseDescription').val()
			var courseName = $('#courseName').val()
			var courseSection = $('#courseYear').val()


			var e = document.getElementById("courseYear");
            var year = e.options[e.selectedIndex].value;


			console.log(courseDescription)
			console.log(courseName)
			console.log(courseSection)
			console.log(year)



			if(courseDescription && courseName && selectedProfArr.length > 0 && courseSection && year){
				//alert('hello')


			$http({
                  method: 'POST',
                  url: 'http://localhost:3000/adminAddNewCourse',
                  data: {
                      'CourseName': courseName,
                      'CourseDescription': courseDescription,
                      'Professors': selectedProfArr
                  }
             })
              .then(function(response){
                    console.log(response.data)


                    $('#courseResponseMessage').text( response.data )
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



    })