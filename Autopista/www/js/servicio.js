angular.module('starter.servicio', [])
.service('Servicio', function() {
    this.Nombre = "Servicio Firebase";
    this.Guardar = Guardar;
    this.Editar = Editar;

    function Guardar(ruta, objeto){
      return firebase.database().ref(ruta).set(objeto);
    }

    function Editar(objeto){
      return firebase.database().ref().update(objeto);
    }

    function Buscar(ruta, objeto){
      
    }
});
