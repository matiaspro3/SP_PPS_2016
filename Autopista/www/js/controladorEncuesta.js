angular.module('starter.controladorEncuesta', [])

.controller('EncuestaCtrl', function($scope, $state, $cordovaGeolocation, $firebaseArray,Data,Servicio, $timeout) {
    
  $scope.encuesta = {};
  
    $scope.encuesta.respuestas = {};    
    $scope.encuesta.respuestas.dondeConocio= "";
    $scope.encuesta.respuestas.usoHabitual = "";
    $scope.encuesta.respuestas.queImpresiono = "";
    $scope.encuesta.respuestas.queDecepciono = "";
    $scope.encuesta.respuestas.loRecomendaria = "";
    $scope.encuesta.respuestas.sugerencia = "";

    $scope.encuesta.fecha = Date();
    $scope.encuesta.usuario = {};

    var usuarioLogeado = firebase.auth().currentUser;
    var referencia = firebase.database().ref('usuario/' + usuarioLogeado.displayName);
    referencia.on('value', function(snapshot) {
    $timeout(function() {
          $scope.encuesta.usuario = snapshot.val();    
        });
    });    
  
    $scope.guardarEncuesta=function(){    
        try{
            console.log($scope.encuesta);
            Servicio.Guardar("Encuestas/" + $scope.encuesta.usuario.nombre +"/" + String($scope.encuesta.fecha) +"/" ,$scope.encuesta);
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