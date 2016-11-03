angular.module('starter.services', [])

.factory('Data', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var fecha = "";


  return {
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    getFecha: function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!

      var yyyy = today.getFullYear();
      if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 
      fecha = dd+'/'+mm+'/'+yyyy;
        return fecha;
    }
  };
});
