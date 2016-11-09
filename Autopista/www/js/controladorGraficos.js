angular.module('starter.controladorGraficos', [])

.controller('GraficosCtrl', function($scope, $state, Servicio, $timeout) {
	try
	{
		if (firebase.auth().currentUser != null)
		{
		    $scope.Accidentes = Servicio.Buscar('/Accidentes');
			console.info($scope.Accidentes);
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

	$scope.CantidadPorDia = function() 
	{
		try
		{
			$scope.cargando = true;
			$timeout(function() {
				$scope.totalAccidente = [];
				$scope.totalFalla = [];
				$scope.totalAnimales = [];
				$scope.totalAmbulancia = [];
				$scope.cantidadAccidente = 0;
				$scope.cantidadFalla = 0;
				$scope.cantidadAnimales = 0;
				$scope.cantidadAmbulancia = 0;
				$scope.dias = [];
				$scope.dia = 0;
				$scope.Accidentes.forEach(function(accidente){
					var fechaAccidente = new Date(accidente.fecha);
					if (!isNaN(fechaAccidente.getDate()))
					{
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
				   		}
						if ($scope.dia == 0)
						{
							$scope.dias.push(String(fechaAccidente.getDate()) + '/' + String(fechaAccidente.getMonth()));
					    	$scope.dia = String(fechaAccidente.getDate()) + '/' + String(fechaAccidente.getMonth());
						}
						else
						{
					   		if ($scope.dia != (String(fechaAccidente.getDate()) + '/' + String(fechaAccidente.getMonth())))
						    {
						    	console.info("cambio dia");
						    	$scope.dias.push(String(fechaAccidente.getDate()) + '/' + String(fechaAccidente.getMonth()));
						    	$scope.dia = String(fechaAccidente.getDate()) + '/' + String(fechaAccidente.getMonth());
						    	$scope.totalAccidente.push($scope.cantidadAccidente);
								$scope.totalFalla.push($scope.cantidadFalla);
								$scope.totalAnimales.push($scope.cantidadAnimales);
								$scope.totalAmbulancia.push($scope.cantidadAmbulancia);
			    				$scope.cantidadAccidente = 0;
								$scope.cantidadFalla = 0;
								$scope.cantidadAnimales = 0;
								$scope.cantidadAmbulancia = 0;
						    }
						}
					}
		  		});
				$scope.totalAccidente.push($scope.cantidadAccidente);
				$scope.totalFalla.push($scope.cantidadFalla);
				$scope.totalAnimales.push($scope.cantidadAnimales);
				$scope.totalAmbulancia.push($scope.cantidadAmbulancia);
			  	Highcharts.chart('divGraficos', {
					chart: {
		            	type: 'bar'
			        },
			        title: {
			            text: 'Accidentes por día'
			        },
			        xAxis: {
			            categories: $scope.dias
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Cantidades',
			                align: 'high'
			            },
			            labels: {
			                overflow: 'justify'
			            }
			        },
			        tooltip: {
			            valueSuffix: ' cantidades'
			        },
			        plotOptions: {
			            bar: {
			                dataLabels: {
			                    enabled: true
			                }
			            }
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'top',
			            x: -40,
			            y: 80,
			            floating: true,
			            borderWidth: 1,
			            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			            shadow: true
			        },
			        credits: {
			            enabled: false
			        },
				    series: [{
				        name: 'Falla Vehiculo',
				        data: $scope.totalFalla
				    }, {
				        name: 'Accidente',
				        data: $scope.totalAccidente 
				    }, {
				        name: 'Animales Sueltos',
				        data: $scope.totalAnimales
				    }, {
				        name: 'Ambulancia',
				        data: $scope.totalAmbulancia
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