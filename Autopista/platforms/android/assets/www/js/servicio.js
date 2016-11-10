angular.module('starter.servicio', [])
.service('Servicio', function() {
    this.Nombre = "Servicio Firebase";
    this.Guardar = Guardar;
    this.Editar = Editar;

    function Guardar(ruta, objeto){
      //return firebase.database().ref(ruta).set(objeto);
      return firebase.database().ref(ruta).push(objeto);
    }

    function Editar(objeto){
      return firebase.database().ref().update(objeto);
    }

    function Buscar(ruta){
         var datos = [];
         var referencia = firebase.database().ref(ruta);
           referencia.on('child_added', function (snapshot) 
           {
                       datos.push(snapshot.val());
           });

       return datos;

    
    }
});
