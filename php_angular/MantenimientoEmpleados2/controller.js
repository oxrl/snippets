angular.module("MyFirstApp",['lumx'])
    .controller('FirstController', ['$scope','$http',function(scope,http) {
    scope.datos=[];
    http.get("conexion.php")
        .success(function (data) {
            scope.datos=data;
        }).error(function (err) {
        console.log("entro ".err);
    });
}]);