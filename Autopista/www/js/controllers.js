angular.module('starter.controllers', [])

.controller('menuCtrl', function($scope, $ionicModal, $timeout, $state) {

  $scope.Deslogear = function (){
    try
    {
      firebase.auth().signOut().catch(function (error){
        console.info("Ha ocurrido un error en Deslogueo(). " + error);
      }).then( function(resultado){
        $state.go("app.encuestas");
      });
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
