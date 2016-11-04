angular.module('starter.controladorMapaAccidentes', [])

.controller('MapaCtrl', function($scope, $state, $cordovaGeolocation,$stateParams, $firebaseArray) {
  //$lala = $stateParams.longitud;
  //$state.go('app.mapaAccidentes', { latitud: lat, longitud: longi });

  //console.info("ALASDLSAD...", $lala);






  var FBRef = new Firebase("https://myapp-d5d9c.firebaseio.com/Accidentes");
  $scope.datosFBArray = $firebaseArray(FBRef);

   var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

        $scope.marker = new google.maps.Marker({
          position: latLng,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: "Mi Ubicacion"
        });

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.marker.setMap($scope.map); 

    $scope.datosFBArray.$loaded()
    .then(function(){
        angular.forEach($scope.datosFBArray, function(marker) {
            //console.log(marker.latitud);
            myLatLng = {lat: Number(marker.latitud), lng: Number(marker.longitud)};
              $scope.marker = new google.maps.Marker({
              position: myLatLng,
              draggable: true,
              animation: google.maps.Animation.DROP,
              title: marker.descripcion
            });
            $scope.marker.setMap($scope.map); 
        })
    });

  }, function(error){
    console.log("Could not get location");
  });
  
})

