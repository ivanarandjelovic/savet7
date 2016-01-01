savet7App.directive('s7Address', function() {
	return {
		restrict: 'E',
		templateUrl: '../partials/s7Address.html',
		scope: {
			address: '=address'
		}
	}
});
