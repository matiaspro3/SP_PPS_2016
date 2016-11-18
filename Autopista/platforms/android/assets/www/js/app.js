// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.servicio','starter.services','starter.pushNotification','starter.pushNotification', 'starter.controllers', 'starter.controladorMapaAccidentes', 
  'starter.controladorLogin','starter.factoryUsuario','starter.controladorGraficos','starter.controladorEncuesta', 'starter.controladorGrilla','starter.controladorAltaAccidente', 'ngCordova', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
      cache : false,
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })
.state('inicio', {
    url: '/inicio',
    templateUrl: 'templates/inicio.html'
      
    
  })

.state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html'
      }
    }
  })
  .state('app.mapaAccidentes', {
      url: '/MapaAccidentes/:accidente',
      cache : false,
      views: {
        
        'menuContent': {
          templateUrl: 'templates/MapaAccidentes.html',
          controller: 'MapaCtrl'

        }
      }
    })

  .state('app.altaAccidente', {
      url: '/AltaAccidente',
      views: {
        'menuContent': {
          templateUrl: 'templates/AltaAccidente.html',
          controller: 'AltaCtrl'

        }
      }
    })


.state('app.encuestas', {
      url: '/Encuestas',
      views: {
        'menuContent': {
          templateUrl: 'templates/encuestas.html',
          controller: 'EncuestaCtrl'

        }
      }
    })


.state('app.graficos', {
      url: '/Graficos',
      views: {
        'menuContent': {
          templateUrl: 'templates/graficos.html',
          controller: 'GraficosCtrl'

        }
      }
    })


  .state('app.grilla', {
      url: '/grilla',
      views: {
        'menuContent': {
          templateUrl: 'templates/Grilla.html',
          controller: 'grillaCtrl'

        }
      }
    })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('registro', {
    url: '/registro',
        templateUrl: 'templates/registro.html',
        controller: 'RegistroCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('inicio');
});
