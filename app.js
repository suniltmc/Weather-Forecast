var WeatherForecast = angular.module('WeatherForecast', ['ngRoute', 'ngResource']);

WeatherForecast.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl : 'template/home.html',
			controller :'homeController'
		})

		.when('/forecast', {
			templateUrl : 'template/forecast.html',
			controller :'forecastController'
		});
});

WeatherForecast.controller('homeController', ['$scope', function($scope){
	
}]);

WeatherForecast.controller('forecastController', ['$scope', function($scope){
	
}]);