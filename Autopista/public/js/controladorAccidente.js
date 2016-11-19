angular.module('starter.controladorAltaAccidente', [])

.controller('AltaCtrl', function($timeout,$scope,$ionicPopup, $state, $cordovaGeolocation, $firebaseArray, Servicio, PushNotificationService, FactoryUsuario) {
  
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
    $scope.alta.usuario = FactoryUsuario.Logueado;

    if ($scope.alta.usuario != null)
    {

        $scope.cargando = true;
        $scope.alta.fecha = new Date().valueOf();
        $scope.alta.id = $scope.alta.usuario.nombre+$scope.alta.fecha;

         $timeout(function() {
           var posOptions = {timeout: 1000, enableHighAccuracy: false};

              var coords = $cordovaGeolocation.getCurrentPosition(posOptions)
                  .then(function (position) {                    
                    try
                    {
                      $scope.alta.latitud=position.coords.latitude;
                      $scope.alta.longitud=position.coords.longitude;
                      if($scope.alta.usuario != "")
                      {                        
                        $scope.showAlerta("Accidente cargado", "Gracias por notificarlo");
                        //console.log($scope.alta);
                        Servicio.Guardar("/Accidentes/"+$scope.alta.usuario.nombre+$scope.alta.fecha+"/",$scope.alta);
                        PushNotificationService.enviarPushNotification($scope.alta);                      
                      }
                      else
                      {
                        $scope.showAlert("No se pudo cargar el accidente. ","Intente nuevamente");   
                      }
                    }
                    catch(error)
                    {
                      console.log(error);
                      $scope.showAlert("No se pudo cargar el accidente. ",error);
                    } 
                 }, function(err) {                  
                      $scope.showAlert("Error al cargar el accidente","Por favor active su GPS");
                });                  
          $scope.cargando = false;
        }, 1000);
         $scope.reset();
         //console.log($scope.alta);
         }
         else
         {
           $scope.showAlertLog("Usted no está logueado. ","Por favor ingrese a su cuenta");              
         }
    }        
          
          $scope.reset = function () {
                     $timeout(function() { 
            $scope.alta = angular.copy($scope.inicial);          
                    }, 3000);                  
             }

          $scope.showAlerta = function(problema,adicional) {
           var alertPopup = $ionicPopup.alert({
             title: problema,
             template: adicional
           });
           alertPopup.then(function(res) {
             //console.log(res);
            if(res)
            {
            $timeout(function() { 
              $state.go('app.grilla');
                }, 1500);                  
            }
           });
        }
  
        $scope.showAlertLog = function(problema,adicional) {
           var alertPopup = $ionicPopup.alert({
             title: problema,
             template: adicional
           });
           alertPopup.then(function(res) {
             //console.log(res);
            if(res)
            {
            $timeout(function() { 
              $state.go("inicio");         
                }, 100);                  
            }
           });
        }


        $scope.showAlert = function(problema,adicional) {
           var alertPopup = $ionicPopup.alert({
             title: problema,
             template: adicional
           });
           alertPopup.then(function(res) {
            console.log(res);            
           });
        }
});