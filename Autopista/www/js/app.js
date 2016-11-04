// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.services', 'starter.controllers', 'starter.controladorMapaAccidentes', 'starter.controladorLogin', 'starter.controladorGrilla','starter.controladorAltaAccidente', 'ngCordova', 'firebase'])

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
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })


  .state('app.mapaAccidentes', {
      url: '/MapaAccidentes/:longitud/:latitud',
      cache : false,
      views: {
        params: [
     'latitud', 'longitud'
  ],
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

.state('app.grilla', {
      url: '/grilla',
      views: {
        'menuContent': {
          templateUrl: 'templates/Grilla.html',
          controller: 'grillaCtrl'

        }
      }
    })

.state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'

        }
      }
    })

.state('app.registro', {
      url: '/registro',
      views: {
        'menuContent': {
          templateUrl: 'templates/registro.html',
          controller: 'RegistroCtrl'

        }
      }
    })





;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/login');
});
