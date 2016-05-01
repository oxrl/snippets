angular.module('FinalApp')
    .factory('PostResource', ['$resource', function($resource){
        return $resource('http://jsonplaceholder.typicode.com/posts/:id',{id: '@id'},{update: {method: "PUT"}});
    }]).
factory('UserResource', ['$resource', function($resource){
    return $resource('http://jsonplaceholder.typicode.com/users/:id',{id: '@id'});
}]);