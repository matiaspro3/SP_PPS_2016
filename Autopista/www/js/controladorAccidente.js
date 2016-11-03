angular.module('starter.controladorAltaAccidente', [])

.controller('AltaCtrl', function($scope, $state, $cordovaGeolocation, $firebaseArray,Data) {
  
  //esta es mi base de datos donde probe las altas.
  //var FBRef = new Firebase("https://primerfirebase-a52b4.firebaseio.com/Accidentes");
  var FBRef = new Firebase("https://myapp-d5d9c.firebaseio.com/Accidentes");
  $scope.datosFBArray = $firebaseArray(FBRef);
    
     //Inicio las variables
    $scope.alta = {};
    $scope.alta.tipo = "";
    $scope.alta.fecha = "";
    $scope.alta.descripcion = "";
    $scope.alta.usuario = "m.mirotta@gmail.com";
    $scope.alta.fecha = Data.getFecha();


    $scope.Guardar=function(){

        //Recupero las coordenadas
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } 
        else {
            console.log("Geolocation is not supported by this browser.");
        }
          alert("La carga se realizó con éxito");
        //console.log($scope.alta.mensaje);

    }
     $scope.showPosition = function(position) {
        setTimeout(function() {
            $scope.alta.latitud=position.coords.latitude;
            $scope.alta.longitud=position.coords.longitude;
            
            //console.info($scope.alta);
           $scope.datosFBArray.$add($scope.alta)
              .then(function(ref){
                 //return ref.key
                    console.log(ref);
                  })
                .catch(function(e){
                //return e
                  console.log(e);
              })
              //console.log(algo);
        });
    };
  
});