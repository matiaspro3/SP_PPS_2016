angular.module('starter.controladorGraficos', [])

.controller('GraficosCtrl', function($scope, $state, Servicio) {
	$scope.Accidentes = Servicio.Buscar('/Accidentes');

	console.info($scope.Accidentes);
	$scope.cantidadAccidente = 0;
	$scope.cantidadFalla = 0;
	$scope.cantidadAnimales = 0;
	$scope.cantidadAmbulancia = 0;

	$scope.CantidadAccidentesTotal = function(){
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
  		console.info($scope.cantidadAccidente);
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
	            name: 'Brands',
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
	}
});