angular.module('FinalApp')
    .controller('MainController', ['$scope','UserResource','PostResource', function(s,ur,pr){
        s.posts = pr.query();
        s.users = ur.query();

        s.removePost = function(post){
            pr.delete({id: post.id},function(data){
                console.log(data);
            });
            s.posts = s.posts.filter(function(element) {
                return element.id !== post.id;
            });
        };
    }])
    .controller('PostController', ['$scope','PostResource','$routeParams','$location', function(s,pr,p,l){
        s.title = "Editar Post";
        s.post = pr.get({id: p.id});
        s.savePost = function(){
            pr.update({id: p.id},{data: s.post}, function(data){
                console.log(data);
                l.path('/post/'+p.id);
            });
        };
    }])
    .controller('NewPostController', ['$scope','PostResource','$location', function(s,pr,l){
        s.post = {};
        s.title = "Crear Post";
        s.savePost = function(){
            pr.save({data: s.post}, function(data){
                console.log(data);
                l.path('/');
            });
        };
    }]);