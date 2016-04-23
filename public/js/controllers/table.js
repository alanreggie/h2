materialAdmin
    .controller('tableCtrl', function($filter, $sce, ngTableParams, tableService, $scope, $http) {
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

       this.getAll = function(){
            

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

        this.updateUsers = function(user){
            console.log(user.firstName)
            
            if (user.userType == 1 || user.userType == 2){
                alert('Professores: Typo 3 \nAlunos: Typo 4. \n\nNAO EXISTE: Typo ' + user.userType + '!')
                user.userType = 5;
            }
            else{
                $http({
                  method: 'POST',
                  url: 'http://localhost:3000/updateUsers',
                  data: {
                      'Email': user.email,
                      'UserID': user.userID,
                      'FirstName': user.firstName,
                      'LastName': user.lastName,
                      'UserType': user.userType,
                      }
                })
                .then(function(response){
                     console.log(response.data)

                   //var users = response.data;

                   //$scope.users = users;
                })
            }
        }



      



    })


    .controller('assignType', function($filter, $sce, ngTableParams, tableService) {
        //alert('testss')

        this.init = function(){
            alert('testing')
        };
    })
