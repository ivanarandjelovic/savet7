savet7App.directive('s7Building', function() {
	return {
		restrict: 'E',
		templateUrl: '../partials/s7Building.html',
		scope: {
			building: '=building'
		}
	}
});
