angular.module('myApp', ['ngRoute', 'controllers'])
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: './home.html'
    })
    .when('/add', {
        templateUrl: './add.html',
        controller: 'addController'
    })
    .when('/single/one/:id', {
        templateUrl: './single.html',
        controller: 'singleController'
    })
    .when('/user', {
        templateUrl: './user.html',
        controller: 'UserController'
    })
    .when('/chirps', {
        templateUrl: './list.html',
        controller: 'listController'
    });
})
.run(function($rootScope) {
    $rootScope.api = 'http://localhost:3000/api/chirps';
});

angular.module('controllers', [])
.controller('listController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $http({
        method: 'GET',
        url: $rootScope.api
    })
    .then(function(success) {
        $scope.chirps = success.data;
    });

    $scope.deleteChirp = function(id) {
        $http({
            method: 'DELETE',
            url: $rootScope.api + '/single' + '/one/' + id
        })
        .then(function(success) {
            var chirps = $scope.chirps;

            chirps = chirps.filter(function(chirp) {
                if (chirp.id !== id) {
                    return chirp;
                }
            });

            $scope.chirps = success.data;
        });
    };
}])
.controller('addController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.user = '';
    $scope.message = '';

    $scope.postChirp = function() {
        if ($scope.user === '' || $scope.message === '') {
            alert('fill out all fields');
        } else {
            var data = {
                user: $scope.user,
                message: $scope.message,
                // date: $scope.date
            };

            $http({
                method: 'POST',
                url: $rootScope.api,
                data: data
            })
            .then(function(success) {
                $http({
                method: 'GET',
                url: $rootScope.api,
            })
                .then(function(success) {
                $scope.chirp = success;
                })
            });
        }
    };
}])
.controller('singleController', ['$scope', '$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {
    $http({
        method: 'GET',
        url: $rootScope.api + '/' + $routeParams.id
    })
    .then(function(success) {
        $scope.chirp = success.data;
    });
}])

.controller('UserController',['$scope', '$routeParams', '$http', '$rootScope', function($scope, $routeParams, $http, $rootScope){
    $http.get("http://localhost:3000/api/users")
        .then(function(response){
        console.log(response.data)
        $scope.users=response.data
    });

    $scope.removeUser=function(){
        console.log('delete clicked')
    $http.delete($rootScope.api + '/single/one/:id')
    .then(function(response){
        console.log(response.data)
    })
    window.location.href= "/#/list"
    }
}]);