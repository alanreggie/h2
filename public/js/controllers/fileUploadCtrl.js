materialAdmin

.controller('fileUploadCtrl', ['$scope', 'multipartForm', function($scope, multipartForm){
	$scope.customer = {};
	this.Submit = function(){
		//alert()
		var uploadUrl = '/upload';
		multipartForm.post(uploadUrl, $scope.customer);
	}
}]);


    // =========================================================================
    // Controller for uploading file
    // =========================================================================
    
    



	    	 /*this.init = function(){
		        //console.log($sessionStorage)
		        //console.log($sessionStorage['user'] == undefined)
		          if($sessionStorage['user'] == undefined){
		            $location.path('/login')
		          }
		          
	      	}*/

	      	/* this.getCoursesOfStudent = function(){
          
		        if($sessionStorage['user'] != undefined){

		            var user = JSON.parse($sessionStorage.user);
		            var userID = user.userID; 
		            console.log(user.user)
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
		     }*/
  
