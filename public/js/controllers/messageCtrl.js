materialAdmin

    // =========================================================================
    // Controller for adding new users and courses
    // =========================================================================
    
    .controller('messageCtrl', function($scope, $http, $window, $sessionStorage, $state){
    	
    	this.init = function(){
    		$("#chatbox").prop({ scrollTop: $("#chatbox").prop("scrollHeight") });
  
          	var app = JSON.parse($sessionStorage.user)
          	$scope.user = app
          
          	console.log(app)
          	$http({
                      method: 'POST',
                      url: 'http://localhost:3000/getClassMates',
                      data: {
                          'userID': app.userID,
                      }
                  })
                .then(function(response){
                    console.log(response.data)
                   // $('#responseMessageRegister').text( response.data )
                 	$scope.classmates = response.data

                 	
                 	//console.log($scope.classmates)
                 })

    	}

    	
    })