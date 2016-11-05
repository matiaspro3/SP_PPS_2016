angular.module('starter.controladorLogin', [])

.controller('LoginCtrl', function($scope, $stateParams, $timeout, $state) {
  $scope.logueado = 'no';
  $scope.verificado = 'no';
  $scope.cartelVerificar = false;

  $scope.login = {};
  $scope.login.usuario = "m.mirotta@gmail.com";
  $scope.login.clave = "";

  $scope.mensajeLogin = {};
  $scope.mensajeLogin.ver = false;
  console.info("sarlanga");
  $scope.Logear = function (){
    $scope.mensajeLogin.ver = false;
    $scope.cartelVerificar = false;
    try
    {
      firebase.auth().signInWithEmailAndPassword($scope.login.usuario, $scope.login.clave)
      .then( function(resultado){
        var usuario = firebase.auth().currentUser;
        var updates = {};
        updates['/usuario/' + usuario.displayName + '/fechaAcceso'] = firebase.database.ServerValue.TIMESTAMP;
        firebase.database().ref().update(updates);

        $timeout(function() {
          $scope.logueado = 'si';
          if (usuario.emailVerified == false)
            $scope.verificado = 'no';
          else
            {
              $scope.verificado = 'si';
              $state.go("app.altaAccidente");
            }
        });
      }, function (error){
          $timeout(function() {
            switch (error.code)
            {
              case "auth/user-not-found":
              case "auth/wrong-password":
              case "auth/invalid-email":
                  $scope.mensajeLogin.mensaje = "Correo o contraseña incorrectos.";
                  $scope.mensajeLogin.ver = true;
                  $scope.mensajeLogin.estilo = "alert-danger";
                break;

            }
            console.info(error.code);
          });
      });
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en Logear(). " + error);
    }
  };

  $scope.Deslogear = function (){
    try
    {
      firebase.auth().signOut().catch(function (error){
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "No se pudo salir de la aplicación, intente nuevamente.";
          $scope.mensajeLogin.estilo = "alert-danger";
      }).then( function(resultado){
        $timeout(function() {
          $scope.logueado = 'no';
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "Gracias por utilizar la aplicación.";
          $scope.mensajeLogin.estilo = "alert-success";
        });
      });
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en Deslogueo(). " + error);
    }
  };

  $scope.Resetear = function (){
    try
    {
      firebase.auth().sendPasswordResetEmail($scope.login.usuario).then(function(resultado){
        $timeout(function() {
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "Email enviado.";
          $scope.mensajeLogin.estilo = "alert-success";
        });
      }).catch(function (error){
        $timeout(function() {
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "No se pudo enviar el mail, intente nuevamente.";
          $scope.mensajeLogin.estilo = "alert-danger";
        });
      });
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en Resetear(). " + error);
    }
  };

  $scope.VerificarMail = function (){
    try
    {
      firebase.auth().currentUser.sendEmailVerification().then(function(resultado){
        $timeout(function() {
          $scope.cartelVerificar = true;
        });
      }).catch(function (error){
        $timeout(function() {
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "No se pudo enviar el mail, intente nuevamente.";
          $scope.mensajeLogin.estilo = "alert-danger";
        });
      });
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en VerificarMail(). " + error);
    }
  };

})

.controller('RegistroCtrl', function($scope, $stateParams, $timeout, $state) {
  $scope.login = {};
  $scope.login.usuario = "jperez@gmail.com";
  $scope.login.clave = "123456";
  $scope.login.nombre = "Juan Perez";

  $scope.mensajeLogin = {};
  $scope.mensajeLogin.ver = false;
  $scope.cartelVerificar = false;
  $scope.Registrar = function (){
    $scope.mensajeLogin.ver = false;
    try
    {
      firebase.auth().createUserWithEmailAndPassword($scope.login.usuario, $scope.login.clave)
      .then(function(resultado){
        var fecha = firebase.database.ServerValue.TIMESTAMP;
        firebase.database().ref('usuario/' + $scope.login.nombre).set({
          correo: $scope.login.usuario,
          nombre: $scope.login.nombre,
          fechaCreacion: fecha,
          fechaAcceso: fecha,
          perfil:"cliente"
        });
        firebase.auth().signInWithEmailAndPassword($scope.login.usuario, $scope.login.clave).catch(function (error){

        }).then( function(resultado){
          firebase.auth().currentUser.updateProfile({
            displayName: $scope.login.nombre,
          }).then(function() {  

          }, function(error) {
            // An error happened.
          });
        });

      },function (error){
        $timeout(function() {
            switch (error.code)
            {
              case "auth/email-already-in-use":
                  $scope.mensajeLogin.mensaje = "El correo ya esta registrado.";
                  $scope.mensajeLogin.ver = true;
                  $scope.mensajeLogin.estilo = "alert-danger";
                break;

            }
            console.info(error.code);
          });
      });
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en Registrar(). " + error);
    }
  };
});
