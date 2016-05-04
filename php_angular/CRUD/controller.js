var app = angular.module('myapp', []);
app.controller('selectcontroller', function($scope, $http)
{
	$scope.currentPage = 0;
	$scope.pageSize = 5;
	$scope.pages = [];
	$scope.users = [];
	$scope.actuales = [];
	$scope.actual = {};
	$scope.actual.genero = "M";
	$scope.actual.email = "";
	$scope.tipos = [];
	$scope.type = null;
	$scope.btnNuevo = true;
	$scope.btnRegistrar = false;

	$http.get("tipos.php").success(function(response)
	{
		$scope.tipos = response;
	});

	$scope.consultarTodos = function()
	{
		$http.get("consultar.php").success(function(response)
		{
			$scope.users = response;

			$scope.pages.length = 0;
			var ini = $scope.currentPage - 1;
			var fin = $scope.currentPage + 1;
			if(ini < 1)
			{
				ini = 1;
				if(Math.ceil($scope.users.length / $scope.pageSize) > 5)
				{
					fin = 5;
				}
				else
				{
					fin = Math.ceil($scope.users.length / $scope.pageSize);
				}
			}
			else
			{
				if (ini >= Math.ceil($scope.users.length / $scope.pageSize) - 5)
				{
					ini =  Math.ceil($scope.users.length / $scope.pageSize) - 5;
					fin =  Math.ceil($scope.users.length / $scope.pageSize);
				}
			}		

			if (ini < 1)
			{
				ini = 1;
			}

			for (var i = ini; i <= fin; i++) 
			{
	          $scope.pages.push({
	            no: i
	          });
	        }

			if ($scope.currentPage >= $scope.pages.length)
			{
				$scope.currentPage = $scope.pages.length - 1;
			}

			$scope.currentPage = 0;

		});
	}

	$scope.setPage = function(index)
	{
		$scope.currentPage = index - 1;
	}

	$scope.consultarUsuario = function(email)
	{
		var url = "consultaremail.php?email=" + email;
		$http.get(url).success(function(response)
		{
			$scope.actuales = response;
			$scope.actual.email = $scope.actuales[0].email;
			$scope.actual.nombre = $scope.actuales[0].nombre;
			$scope.actual.apellido = $scope.actuales[0].apellido;
			$scope.actual.pass = $scope.actuales[0].pass;
			$scope.actual.genero = $scope.actuales[0].genero;
			$scope.actual.tipo_usuario = $scope.actuales[0].tipo_usuario;
			$scope.type.nombre = $scope.actuales[0].tipo_usuario;
		});
	}

	$scope.eliminar = function()
	{
		var url = "delete.php";
		$http.post(url,{'email':$scope.actual.email}).success(function(data, status, headers, config)
		{
			console.log("Datos eliminados");
			$scope.actual = {};
			$scope.actual.genero = "M";
			$scope.actual.email = "";
			$scope.consultarTodos();
		});
	}

	$scope.editar = function()
	{
		var url = "update.php";
		$http.post(url,{'email':$scope.actual.email, 'nombres':$scope.actual.nombre, 'apellidos':$scope.actual.apellido, 'pass':$scope.actual.pass, 'genero':$scope.actual.genero, 'tipo':$scope.type.nombre}).success(function(data, status, headers, config)
		{
			console.log("Datos Editados");
			$scope.actual = {};
			$scope.actual.genero = "M";
			$scope.actual.email = "";
			$scope.consultarTodos();
		});
	}

	$scope.nuevo = function()
	{
		$scope.btnNuevo = false;
		$scope.btnRegistrar = true;
		scope.actual = {};
		$scope.actual.genero = "M";
	}

	$scope.registrar = function()
	{
		$scope.btnNuevo = true;
		$scope.btnRegistrar = false;
		var url = "insert.php";
		$http.post(url,{'email':$scope.actual.email, 'nombres':$scope.actual.nombre, 'apellidos':$scope.actual.apellido, 'pass':$scope.actual.pass, 'genero':$scope.actual.genero, 'tipo':$scope.type.nombre}).success(function(data, status, headers, config)
		{
			alert(data);
			console.log("Datos Editados");
			$scope.actual = {};
			$scope.actual.genero = "M";
			$scope.actual.email = "";
			$scope.consultarTodos();
		});
	}
})

app.filter('startFromGrid', function() 
{
	return function(input, start) 
	{
		start =+ start;
		return input.slice(start)
	}
});