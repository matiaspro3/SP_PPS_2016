angular.module('starter.controladorEncuesta', [])

.controller('EncuestaCtrl', function($scope, $state, $cordovaGeolocation, $firebaseArray,Data,Servicio, $timeout,FactoryUsuario) {
    
  $scope.encuesta = {};
  
    $scope.encuesta.respuestas = {};    
    $scope.encuesta.respuestas.dondeConocio= "";
    $scope.encuesta.respuestas.usoHabitual = "";
    $scope.encuesta.respuestas.queImpresiono = "";
    $scope.encuesta.respuestas.queDecepciono = "";
    $scope.encuesta.respuestas.loRecomendaria = "";
    $scope.encuesta.respuestas.sugerencia = "";

    $scope.encuestaInvisible = true;
    $scope.preguntaInvisible = false;
    $scope.encuesta.fecha = Date();
    $scope.encuesta.usuario = FactoryUsuario.Logueado;
 
    $scope.guardarEncuesta=function(){    
        try{
         
           Servicio.Guardar("Encuestas/" + $scope.encuesta.usuario.nombre +"/" + String($scope.encuesta.fecha) +"/" ,$scope.encuesta.respuestas);
           //console.log("Encuestas/" + $scope.encuesta.usuario.nombre +"/" + String($scope.encuesta.fecha) +"/" ,$scope.encuesta.respuestas);
            firebase.auth().signOut().catch(function (error){
          
              }).then( function(resultado){
               // console.log( "salio!");
                 ionic.Platform.exitApp();
               
          });
        }catch(error)
      {
          console.info("Ha ocurrido un error en la encuesta. " + error);
      }
    }

    $scope.salir=function(){   
         console.log( "salio!"); 
         //ionic.Platform.exitApp();
    }

    $scope.irEncuesta=function(){    
          $scope.encuestaInvisible = false;
          $scope.preguntaInvisible = true;
    }

    

});