angular.module('starter.controllers', [])

.controller('menuCtrl', function($scope, $ionicModal, $timeout, $state, Servicio, FactoryUsuario) {
  try
  {
    if (firebase.auth().currentUser != null)
    {
      $scope.usuario = FactoryUsuario.Logueado;
    }
    else
    {
      $state.go("app.inicio");
    }
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
