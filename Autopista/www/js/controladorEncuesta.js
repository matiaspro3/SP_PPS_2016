angular.module('starter.controladorEncuesta', [])

.controller('EncuestaCtrl', function($scope, $state, $cordovaGeolocation, $firebaseArray,Data,Servicio, $timeout) {

	$scope.titulo = "Encuesta sobre calidad del servicio";
    
	$scope.encuesta = {};
	
    $scope.encuesta.respuestas = {};
    
    $scope.encuesta.respuestas.dondeConocio= "";
    $scope.encuesta.respuestas.usoHabitual = "";
    $scope.encuesta.respuestas.queImpresiono = "";
    $scope.encuesta.respuestas.queDecepciono = "";
    $scope.encuesta.respuestas.loRecomendaria = "";
  // $scope.encuesta.usuario = firebase.auth().currentUser.email;
    $scope.encuesta.fecha = Date();
    $scope.encuesta.usuario = {};

    var usuarioLogeado = firebase.auth().currentUser;
    $scope.usuario = {};
    var referencia = firebase.database().ref('usuario/' + usuarioLogeado.displayName);
    referencia.on('value', function(snapshot) {
    $timeout(function() {
          $scope.usuario = snapshot.val();
    
       	});
    });    

    
  
    $scope.guardarEncuesta=function(){
       
         try{


          $scope.encuesta.usuario = $scope.usuario;
          console.log($scope.encuesta);
          Servicio.Guardar("Encuestas",$scope.encuesta);

      	firebase.auth().signOut().catch(function (error){
        	console.info("Ha ocurrido un error en la encuesta. " + error);
      	}).then( function(resultado){
        	$state.go("app.inicio");
      	});

      }catch(error)
    {
      console.info("Ha ocurrido un error en la encuesta. " + error);
    }

    }

   

});