angular.module('starter.pushNotification', [])
.service('PushNotificationService', function ($http) {
  var Url="https://fcm.googleapis.com/fcm/send"; 

  function traerURL(){
    return Url;
  }

  this.enviarPushNotification = function (accidente) {
    var http = new XMLHttpRequest();
    var url = traerURL();
    var params = JSON.stringify(
    {
      to:"KNQU_wgx4:APA91bHy38Hf2pNJzmuvrVBDE09iEdurBTwgYQyAWOf9kt0Oed06vG261JpmNfkyVhharyVhO_Js5dl3tosSmRuIr6KYqoOLGSo1D52cYnN2pk7JzotYpWvNVqV4lTXBxxiak7sUKQM2",
      notification:{
      title : "Autopista Borbotones",
      icon : "img/fotoPerfil.png", 
      body : "Informe de " + accidente.tipo + "! " + accidente.descripcion,
      priority : 10
      }
    });

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader('Authorization', 'key=AIzaSyBQxVjWI0f_VKfsdYOc2x-CdWqFlF2ThuY');

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send(params);
  }

});