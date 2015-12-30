//Creating a module and 
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
		})

		.when('/forecast/:days', {
			templateUrl : 'template/forecast.html',
			controller :'forecastController'
		});
});

//Directives

WeatherForecast.directive("weatherreport", function(){
	return{
		restrict: 'E',
		templateUrl : 'directives/weatherreport.html',
		replace: true,
		scope : {
			weatherDay : "=",
			convertToStandard: "&",
			convertToDate : "&",
			dateFormat : "@"

		}
	}
})

//Services
WeatherForecast.service('cityService', function(){
	this.city ="New York";
})

//Controllers
WeatherForecast.controller('homeController', ['$scope','$location', 'cityService', function($scope, $location, cityService){
	$scope.city = cityService.city;
	$scope.submit = function(){
		$location.path("/forecast");
	}

	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	})
	
}]);

WeatherForecast.controller('forecastController', ['$scope', '$resource','$routeParams', 'cityService', function($scope, $resource,$routeParams, cityService){
	
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || '2';
	$scope.weatherAPPID = '35eceb4011ce1121020cb39012dba9df'
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback:"JSON_CALLBACK"}, {get:{method: "JSONP"}});
	$scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city, cnt: $scope.days, APPID : $scope.weatherAPPID })

	$scope.convertTemparature = function(degK){
		return Math.round((1.8 * (degK -273)) +32 );
	};
	$scope.convertDate = function(dt){
		return new Date(dt*1000)
	}
}]);



