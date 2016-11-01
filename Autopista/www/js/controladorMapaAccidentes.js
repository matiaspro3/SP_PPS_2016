angular.module('starter.controladorMapaAccidentes', [])

.controller('MapaCtrl', function($scope, $state, $cordovaGeolocation) {
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
          title: "MARKER"
        });

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.marker.setMap($scope.map); 
  }, function(error){
    console.log("Could not get location");
  });
  
})

