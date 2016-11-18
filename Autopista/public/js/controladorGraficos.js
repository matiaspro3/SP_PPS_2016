angular.module('starter.controladorGraficos', [])

.controller('GraficosCtrl', function($scope, $state, Servicio, $timeout) {
	try
	{
		$scope.Accidentes = [];
		if (firebase.auth().currentUser != null)
		{
			$timeout(function(){
			    Servicio.Cargar('/Accidentes').on('child_added',function(snapshot)
				{
					$scope.Accidentes.push(snapshot.val());
				});
			});
			$scope.cargando = false;
		}
		else
		{
		  $state.go("app.inicio");
		}
	}
	catch (error)
	{
		console.info("Ha ocurrido un error en Deslogueo(). " + error);
	}
	
	$scope.CantidadAccidentesTotal = function() 
	{
		try
		{
			$scope.cargando = true;
			$scope.cantidadAccidente = 0;
			$scope.cantidadFalla = 0;
			$scope.cantidadAnimales = 0;
			$scope.cantidadAmbulancia = 0;
			$scope.cantidadArbol = 0;
			$scope.cantidadIncendio = 0;
			$scope.cantidadNieve = 0;
			$timeout(function() {
				$scope.Accidentes.forEach(function(accidente){
				    switch (accidente.tipo){
				    	case "Accidente":
				    			$scope.cantidadAccidente = parseInt($scope.cantidadAccidente) + 1;
				    		break;
				    	case "Averia en vehiculo":
				    			$scope.cantidadFalla = parseInt($scope.cantidadFalla) + 1;
				    		break;
				    	case "Animales sueltos":
				    			$scope.cantidadAnimales = parseInt($scope.cantidadAnimales) + 1;
				    		break;
				    	case "Necesidad de Ambulancia":
				    			$scope.cantidadAmbulancia = parseInt($scope.cantidadAmbulancia) + 1;
				    		break;
				    	case "Incendio":
				    			$scope.cantidadIncendio = parseInt($scope.cantidadIncendio) + 1;
				    		break;
				    	case "Arbol Caido":
				    			$scope.cantidadArbol = parseInt($scope.cantidadArbol) + 1;
				    		break;
				    	case "Nieve en el Camino":
				    			$scope.cantidadNieve = parseInt($scope.cantidadNieve) + 1;
				    		break;
				    }
		  		});
			  	Highcharts.chart('divGraficos', {
				   chart: {
			            type: 'column'
			        },
			        title: {
			            text: 'Cantidad Accidentes Total'
			        },
			        xAxis: {
			            type: 'category'
			        },
			        yAxis: {
			            title: {
			                text: 'Cantidades'
			            }

			        },
			        legend: {
			            enabled: false
			        },
			        plotOptions: {
			            series: {
			                borderWidth: 0,
			                dataLabels: {
			                    enabled: true,
			                }
			            }
			        },
			        series: [{
			            name: 'Cantidad',
			            colorByPoint: true,
			            data: [{
			                name: 'Falla Vehículo',
			                y: $scope.cantidadFalla
			            }, {
			                name: 'Accidente',
			                y: $scope.cantidadAccidente
			            }, {
			                name: 'Animales Sueltos',
			                y: $scope.cantidadAnimales
			            }, {
			                name: 'Ambulancia',
			                y: $scope.cantidadAmbulancia
			            }, {
			                name: 'Arbol Caido',
			                y: $scope.cantidadArbol
			            }, {
			                name: 'Incendio',
			                y: $scope.cantidadIncendio
			            }, {
			                name: 'Nieve en camino',
			                y: $scope.cantidadNieve
			            }]
			        }]
				});
				$scope.cargando = false;
			}, 1000); //Cierra timeout
		}
		catch (error)
		{
			console.info("Ha ocurrido un error en GraficoTotal(). " + error);
		}
	}

	$scope.CantidadAccidentesHoy = function() 
	{
		try
		{
			$scope.cargando = true;
			$timeout(function() {
				$scope.cantidadAccidente = 0;
				$scope.cantidadFalla = 0;
				$scope.cantidadAnimales = 0;
				$scope.cantidadAmbulancia = 0;
				$scope.cantidadArbol = 0;
				$scope.cantidadIncendio = 0;
				$scope.cantidadNieve = 0;
				$scope.dias = [];
				$scope.dia = 0;
				$scope.Accidentes.forEach(function(accidente){
					var fechaAccidente = new Date(accidente.fecha);
					var fechaActual = new Date();
					if (!isNaN(fechaAccidente.getDate()))
					{
						var fechaAccidenteFormato = String(fechaAccidente.getDate()) + '/' + String(fechaAccidente.getMonth()) + '/' + String(fechaAccidente.getYear());
						var fechaActualFormato = String(fechaActual.getDate()) + '/' + String(fechaActual.getMonth()) + '/' + String(fechaActual.getYear());
						if (fechaAccidenteFormato == fechaActualFormato)
						{
							console.info("entre");
						   	switch (accidente.tipo){
						    	case "Accidente":
						    			$scope.cantidadAccidente = parseInt($scope.cantidadAccidente) + 1;
						    		break;
						    	case "Averia en vehiculo":
						    			$scope.cantidadFalla = parseInt($scope.cantidadFalla) + 1;
						    		break;
						    	case "Animales sueltos":
						    			$scope.cantidadAnimales = parseInt($scope.cantidadAnimales) + 1;
						    		break;
						    	case "Necesidad de Ambulancia":
						    			$scope.cantidadAmbulancia = parseInt($scope.cantidadAmbulancia) + 1;
						    		break;
						    	case "Incendio":
						    			$scope.cantidadIncendio = parseInt($scope.cantidadIncendio) + 1;
						    		break;
						    	case "Arbol Caido":
						    			$scope.cantidadArbol = parseInt($scope.cantidadArbol) + 1;
						    		break;
						    	case "Nieve en el Camino":
						    			$scope.cantidadNieve = parseInt($scope.cantidadNieve) + 1;
						    		break;
					   		}
				   		}
					}
		  		});
			  	Highcharts.chart('divGraficos', {
					chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false,
			            type: 'pie'
			        },
			        title: {
			            text: 'Total accidentes de hoy'
			        },
			        tooltip: {
			            pointFormat: '{series.name}: <b>{point.y}</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    format: '<b>{point.name}</b>: {point.y}',
			                    style: {
			                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
			                    }
			                }
			            }
			        },
			        series: [{
			            name: 'Cantidad',
			            colorByPoint: true,
			            data: [{
			                name: 'Falla Vehículo',
			                y: $scope.cantidadFalla
			            }, {
			                name: 'Accidente',
			                y: $scope.cantidadAccidente
			            }, {
			                name: 'Animales Sueltos',
			                y: $scope.cantidadAnimales
			            }, {
			                name: 'Ambulancia',
			                y: $scope.cantidadAmbulancia
			            }, {
			                name: 'Arbol Caido',
			                y: $scope.cantidadArbol
			            }, {
			                name: 'Incendio',
			                y: $scope.cantidadIncendio
			            }, {
			                name: 'Nieve en camino',
			                y: $scope.cantidadNieve
			            }]
			        }]
			    });
				$scope.cargando = false;
			}, 1000); //Cierra timeout
		}
		catch (error)
		{
			console.info("Ha ocurrido un error en Deslogueo(). " + error);
		}
	}
});