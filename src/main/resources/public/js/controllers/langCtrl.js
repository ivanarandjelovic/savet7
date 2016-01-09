savet7App.controller('langCtrl', function($scope, $translate, $log, $route) {

	$scope.langData = {};

	$scope.langData.langCd = $translate.proposedLanguage();
	// $log.debug($scope.lang);

	$scope.useLang = function(newLang) {
		$translate.use(newLang).then(function(data) {
			$scope.langData.langCd = data;
			$route.reload();
		});
	};

});
