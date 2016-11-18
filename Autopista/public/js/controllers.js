angular.module('starter.controllers', [])

.controller('menuCtrl', function($scope, $ionicModal, $timeout, $state, Servicio, FactoryUsuario) {
    try
    {
  
    
        $scope.usuario = FactoryUsuario.Logueado;
  }
   catch (error)
    {
      console.info("Ha ocurrido un error en Deslogueo(). " + error);
    }
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
