angular.module('starter.controllers', [])

.controller('menuCtrl', function($scope, $ionicModal, $timeout, $state, Servicio, FactoryUsuario) {
       

       $scope.usuario={};
   
        $scope.usuario = FactoryUsuario.Logueado;

     Servicio.Cargar('/usuario/').on('value',
          function(respuesta) {
            
         $scope.grilla= respuesta.val();
//console.info("grilla",$scope.grilla.);
          },
          function(error) {
            // body...
          }

        );


  $scope.Deslogear = function (){
    try
    {
        $state.go("app.encuestas");
    }
    catch (error)
    {
      console.info("Ha ocurrido un error en Deslogueo(). " + error);
    }
  };

  $scope.IrA = function(estado) {
    $state.go("app." + estado);
  };
});
