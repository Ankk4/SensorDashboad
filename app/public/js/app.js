(function() {
	var app = angular.module('dashboard', []);
	app.controller('DashboardController', function(){
		$scope.Sensors = sensors;
	});

	var sensors = [
		{
			name: "Tempeture",
			voltage: 0,
			celsius: 0,
			farenheit: 0
		},
		{
			name: "Light level"
		}
	];

})();