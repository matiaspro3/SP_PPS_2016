angular.module('starter.controladorMapaAccidentes', [])

.controller('MapaCtrl', function($scope, $state, $cordovaGeolocation,$stateParams, $firebaseArray) {

  if($stateParams.accidente != "")
  {
    var accidente = JSON.parse($stateParams.accidente);
  }
  else
  {
    var accidente = {};
    accidente.latitud = null;
    accidente.longitud = null;
  }

  var FBRef = new Firebase("https://autopista-b6678.firebaseio.com/Accidentes");
  $scope.datosFBArray = $firebaseArray(FBRef);

   var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var tipoAccidente = "";
    var latLng;

    if(accidente.latitud != null && accidente.longitud != null)
    {
      latLng = new google.maps.LatLng(accidente.latitud, accidente.longitud);
      //alert("vine de lista");
    }
    else
    {
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //alert("elegi mapa");
    }
 
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
            //console.log(marker);
            if(marker.activo){
              tipoAccidente = getIconoMarker(marker.tipo);
              myLatLng = {lat: Number(marker.latitud), lng: Number(marker.longitud)};
                $scope.marker = new google.maps.Marker({
                position: myLatLng,
                draggable: true,
                animation: google.maps.Animation.DROP,
                title: marker.descripcion,
                icon : tipoAccidente
              });
              $scope.marker.setMap($scope.map); 
            }  
        })
    });

  }, function(error){
    console.info(error);
    console.log("Could not get location");
  });


  function getIconoMarker(tipoAccidente){
    switch(tipoAccidente){
      case 'Accidente':
        return "img/accidenteauto.png";
        break;
      case 'Necesidad de Ambulancia':
        return "img/ambulancia.png";
        break;
      case 'Animales sueltos':
        return "img/animal.png";
        break;
      case 'Averia en vehiculo':
        return "img/averia.png";
        break;
      case 'Arbol Caido':
        return "img/arbol.png";
        break;
      case 'Nieve en el Camino':
        return "img/caminocongelado.png";
        break;
      case 'Incendio':
        return "img/fuego.png";
        break;   
      default:
      return "";
    }
  }
  
})

