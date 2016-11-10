angular.module('starter.controladorGrilla', [])

.controller('grillaCtrl', function($scope, $timeout, $state, Servicio) {


	$scope.ListadoAccidentes = Servicio.Buscar('/Accidentes');

	//var FBRef = new Firebase("https://myapp-d5d9c.firebaseio.com/Accidentes");
  	//$scope.ListadoAccidentes = $firebaseArray(FBRef);

 	console.info($scope.ListadoAccidentes);

 	$scope.VerMapa = function(lat,long){

 		$state.go('app.mapaAccidentes',{latitud : lat, longitud: long});

 	};

 	$scope.Solucionar = function(accidente){

 		accidente.activo = false;
 		var updates = {};
        updates['/Accidentes/' + accidente.$$hashKey + accidente.activo ] = false;
        Servicio.Editar(updates);
 		$state.go('app.grilla');

 	};

})

