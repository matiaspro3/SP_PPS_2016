angular.module('starter.controladorAltaAccidente', [])

.controller('AltaCtrl', function($timeout,$scope, $state, $cordovaGeolocation, $firebaseArray, Servicio, PushNotificationService, FactoryUsuario) {
  
  //esta es mi base de datos donde probe las altas.
  //var FBRef = new Firebase("https://primerfirebase-a52b4.firebaseio.com/Accidentes"); 

    //Inicio las variables
    $scope.alta = {};
    $scope.inicial = {
            tipo : "",
            fecha : "",
            descripcion : "",
            usuario : "",
            fecha : "",
            activo : true,
            id : "",
            cargando : false,
            };
    $scope.alta = angular.copy($scope.inicial);
    
    $scope.guardarAccidente=function(){
        //Recupero las coordenadas

        $scope.cargando = true;
        $scope.alta.usuario = FactoryUsuario.Logueado;
        $scope.alta.fecha = new Date().valueOf();
        $scope.alta.id = $scope.alta.usuario.nombre+$scope.alta.fecha;

         $timeout(function() {
           var posOptions = {timeout: 10000, enableHighAccuracy: false};

              var coords = $cordovaGeolocation.getCurrentPosition(posOptions)
                  .then(function (position) {                    
                    $scope.alta.latitud=position.coords.latitude;
                    $scope.alta.longitud=position.coords.longitude;
                    alert("ACCIDENTE CARGADO GPS ON");
                      Servicio.Guardar("/Accidentes/"+$scope.alta.usuario.nombre+$scope.alta.fecha+"/",$scope.alta);
                      PushNotificationService.enviarPushNotification($scope.alta);                      
                      //console.log($scope.alta);
                  }, function(err) {
                  // error
                      //console.log("25.error en acceso a posicion del GPS" + err);
                      alert("No se puede cargar el accidente, por favor active su GPS");
                });                  
          $scope.cargando = false;
        }, 1000);
         $scope.reset();
         //console.log($scope.alta);
    }        
          
          $scope.reset = function () {
                     $timeout(function() { 
            $scope.alta = angular.copy($scope.inicial);          
                    }, 1500);                  
             }
});