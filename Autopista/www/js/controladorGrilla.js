angular.module('starter.controladorGrilla', [])

.controller('grillaCtrl', function($scope, $timeout, $state, Servicio, FactoryUsuario) {

	$scope.ListadoAccidentes = [];
	var i = 0;
	Servicio.Cargar('/Accidentes')
		.on('child_added',function(snapshot)
			{
				var fecha_parse = new Date(snapshot.val().fecha);
				var anio = fecha_parse.getFullYear();
				var mes = fecha_parse.getMonth();
				var dia = fecha_parse.getDate();
				var hora = fecha_parse.getHours();
				var minutos = fecha_parse.getMinutes();
				if(minutos.toString().length == 1)
				{
					minutos = "0" + minutos;
				}
				if(hora.toString().length == 1)
				{
					hora = "0" + hora;
				}

				var fecha = dia+"/"+mes+"/"+anio+" "+hora+":"+minutos;
				$scope.ListadoAccidentes.push(snapshot.val());
				$scope.ListadoAccidentes[i].fecha = fecha;
				i = i + 1;
			});

	//var FBRef = new Firebase("https://myapp-d5d9c.firebaseio.com/Accidentes");
  	//$scope.ListadoAccidentes = $firebaseArray(FBRef);

 	

 	$scope.VerMapa = function(accidente){

 		$state.go('app.mapaAccidentes',{accidente : JSON.stringify(accidente)});

 	};

 	$scope.Solucionar = function(accidente){

 		accidente.activo = false;
 		var updates = {};
        updates['/Accidentes/' + accidente.id +"/activo" ] = false;
        updates['/Accidentes/' + accidente.id +"/usuario_cerro" ] = FactoryUsuario.Logueado.nombre;
        console.info(updates);
        Servicio.Editar(updates);
 		$state.go('app.grilla');

 	};

})

