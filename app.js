var WeatherForecast = angular.module('WeatherForecast', ['ngRoute', 'ngResource']);

//Routing
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

//Services
WeatherForecast.service('cityService', function(){
	this.city ="New York";
})

//Controllers
WeatherForecast.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;

	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	})
	
}]);

WeatherForecast.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
	$scope.city = cityService.city;
	$scope.weatherAPPID = '35eceb4011ce1121020cb39012dba9df'

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback:"JSON_CALLBACK"}, {get:{method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city, cnt: 2, APPID : $scope.weatherAPPID })

	console.log($scope.weatherResult);
}]);

