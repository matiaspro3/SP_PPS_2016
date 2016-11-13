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
        if (navigator.geolocation) {
            //navigator.geolocation.getCurrentPosition($scope.showPosition);
           // alert("La carga se realizó con éxito");
           console.log($scope.alta);
        } 
        else 
        {
            //navigator.geolocation.getCurrentPosition($scope.showPosition);
            //console.log($scope.alta);
            console.log("Geolocation is not supported by this browser.");
        }

          //PushNotificationService.enviarPushNotification($scope.alta);
          $scope.cargando = false;
        }, 1000);
         $scope.reset();
         console.log($scope.alta);
    }        
          
          $scope.reset = function () {
                     $timeout(function() {

            console.log($scope.inicial);
        $scope.alta = angular.copy($scope.inicial);          
                }, 
                1000);                  
             }
            



     $scope.showPosition = function(position) {
        setTimeout(function() {        
          console.log($scope.alta);
            $scope.alta.latitud=position.coords.latitude;
            $scope.alta.longitud=position.coords.longitude;

            Servicio.Guardar("/Accidentes/"+$scope.alta.usuario.nombre+$scope.alta.fecha+"/",$scope.alta);
        });
    };
  
});