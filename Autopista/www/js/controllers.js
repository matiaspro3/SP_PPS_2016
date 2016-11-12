angular.module('starter.controllers', [])

.controller('menuCtrl', function($scope, $ionicModal, $timeout, $state) {
  try
  {
    if (firebase.auth().currentUser != null)
    {
      var usuarioLogeado = firebase.auth().currentUser;
      $scope.usuario = {};
      var referencia = firebase.database().ref('usuario/' + usuarioLogeado.displayName);
      referencia.on('value', function(snapshot) {
        $timeout(function() {
          $scope.usuario = snapshot.val();
        });
      });
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
