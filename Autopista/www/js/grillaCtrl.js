angular.module('starter.controladorGrilla', [])

.controller('grillaCtrl', function($scope, $firebaseArray, $timeout, $state) {

	var FBRef = new Firebase("https://myapp-d5d9c.firebaseio.com/Accidentes");
 	$timeout($scope.ListadoAccidentes = $firebaseArray(FBRef));

 	console.info($scope.ListadoAccidentes);

 	$scope.VerMapa = function(lat,long){

 		alert(lat + long);

 	};

})

