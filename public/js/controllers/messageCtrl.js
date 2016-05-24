materialAdmin

    // =========================================================================
    // Controller for adding new users and courses
    // =========================================================================
    
    .controller('messageCtrl', function($scope, $http, $window, $sessionStorage, $state){
    	
      this.sendMessage = function(message){
        //alert(message)
        var user = JSON.parse($sessionStorage.user)
        var userID = user.userID
       // console.log($scope.user2.userID)
       //var self = this
        $http({
                method: 'POST',
                url: 'http://localhost:3000/postMessage',
                data: {
                    'user2': $scope.user2.userID,
                    'user1': userID,
                    'message': message,
                    'date': Date()
                }
            })
          .then(function(response){
              console.log(response.data)
              var res = response.data

              //self.getMessages($scope.user2)
           })

          //refresh messages
          $('#message').val( '' ) 
          this.getMessages($scope.user2)

      }

      this.getMessages = function(userFrom){
          var user = JSON.parse($sessionStorage.user)
          var userID = user.userID

          $scope.user2 = userFrom

          //alert(userFrom.userID)

          $http({
                method: 'POST',
                url: 'http://localhost:3000/getMessages',
                data: {
                    'user1': userFrom.userID,
                    'user2': userID
                }
            })
          .then(function(response){
              console.log(response.data)
              var res = response.data

              if(res.indexOf("Erro") > -1){
                  console.log('Message not sent')
              }
              else{
                 $scope.messages = response.data
                 $("#chatbox").animate({ scrollTop: $('#chatbox').prop("scrollHeight")});

              }             
            //console.log($scope.classmates)
           })
           // $('#chatbox').scrollTop($('#chatbox').height())


      }


    	this.init = function(){

              if($sessionStorage['user'] == undefined){
                $location.path('/login')
              }
              else{
                $("#chatbox").animate({ scrollTop: $('#chatbox').prop("scrollHeight")});
  
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
                        //if(response.data.length )
                        $scope.classmates = response.data

                      
                      //console.log($scope.classmates)
                     })
              }
              

    	}

    	
    })