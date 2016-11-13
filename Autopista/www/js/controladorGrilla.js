angular.module('starter.controladorGrilla', [])

.controller('grillaCtrl', function($scope, $timeout, $state, Servicio) {

	$scope.ListadoAccidentes = [];
	Servicio.Cargar('/Accidentes')
		.on('child_added',function(snapshot)
			{
				$scope.ListadoAccidentes.push(snapshot.val());
			});

	//var FBRef = new Firebase("https://myapp-d5d9c.firebaseio.com/Accidentes");
  	//$scope.ListadoAccidentes = $firebaseArray(FBRef);

 	console.info($scope.ListadoAccidentes);

 	$scope.VerMapa = function(accidente){

 		$state.go('app.mapaAccidentes',{accidente : JSON.stringify(accidente)});

 	};

 	$scope.Solucionar = function(accidente){

 		accidente.activo = false;
 		var updates = {};
        updates['/Accidentes/' + accidente.id +"/activo" ] = false;
        console.info(updates);
        Servicio.Editar(updates);
 		$state.go('app.grilla');

 	};

})

