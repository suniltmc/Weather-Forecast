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

WeatherForecast.service('cityService', function(){
	this.city ="Hyderabad";
})

WeatherForecast.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;

	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	})
	
}]);

WeatherForecast.controller('forecastController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;
}]);

