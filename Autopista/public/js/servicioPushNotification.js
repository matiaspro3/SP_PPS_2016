angular.module('starter.pushNotification', [])
.service('PushNotificationService', function ($http) {
  var Url="https://fcm.googleapis.com/fcm/send"; 

  function traerURL(){
    return Url;
  }

  this.enviarPushNotification = function () {
    var http = new XMLHttpRequest();
    var url = traerURL();
    var params = JSON.stringify(
    {
      to:"KNQU_wgx4:APA91bHW8lAe3dpRG5SOrRm0CKjpYW_br5tavb9gDyBqQfHCRN8wK-oJfHVVdF9pfHl0bwsKAec6ZpUeP3FJzAC39MR7VpHk_no_cEw44pEED-63No-bmSr7AeD2ju3VWNm6uwUr5Be9",
      notification:{
      body : "Se informó un nuevo accidente",
      priority : 10
      }
    });

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader('Authorization', 'key=AIzaSyDnwQrddWxxvrsvJZL3_fRZ7Ihb4gQLqZQ');

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
  }

});