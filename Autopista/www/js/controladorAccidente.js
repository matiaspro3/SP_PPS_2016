angular.module('starter.controladorAltaAccidente', [])

.controller('AltaCtrl', function($scope, $state, $cordovaGeolocation, $firebaseArray, Servicio, PushNotificationService) {
  
  //esta es mi base de datos donde probe las altas.
  //var FBRef = new Firebase("https://primerfirebase-a52b4.firebaseio.com/Accidentes"); 

    //Inicio las variables
    $scope.alta = {};
    $scope.alta.tipo = "";
    $scope.alta.fecha = "";
    $scope.alta.descripcion = "";
    $scope.alta.usuario = firebase.auth().currentUser.email;
    $scope.alta.fecha = Date();
    $scope.alta.activo = true;


    $scope.guardarAccidente=function(){
        //Recupero las coordenadas
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } 
        else {
            console.log("Geolocation is not supported by this browser.");
        }
          alert("La carga se realizó con éxito");
          PushNotificationService.enviarPushNotification($scope.alta);
          //console.log($scope.alta);
    }
     $scope.showPosition = function(position) {
        setTimeout(function() {        
            $scope.alta.latitud=position.coords.latitude;
            $scope.alta.longitud=position.coords.longitude;

            Servicio.Guardar("/Accidentes",$scope.alta);
        });
    };
  
});