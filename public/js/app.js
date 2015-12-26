(function(){
	var app = angular.module('dashboard', []);
	app.controller('DashboardController', function($scope){
		
		$scope.sensors = sens;
	});
	
	var sens = [
		{
			name: "Tempeture",
			Celsius: 0,	
			Farenheit: 0,
			VoltageRead: 0,
			dashboard: true
		},{
			name: "Light level",
			dashboard: false			
		}
	];	
})();

