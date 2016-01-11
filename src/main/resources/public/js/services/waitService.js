// Just holds state for now ...
savet7App.factory('waitService', function(spinnerService, $log, $timeout) {

	// Once shown, wait screen will be visible at least this much milliseconds.
	var minWaitDurationTimeMs = 300;

	// Wait show delay time. If request to hide comes sooner, we will not show
	// wait screen at all
	var delayDurationTimeMs = 300;

	var state = {
		showWait : 0,
		hideWaitScheduled : false
	}

	// $log.debug("Initialized waitService with:", state);

	var _showWait = function() {

		// $log.debug("_showWait called, counter: " + state.showWait);
		if (state.showWait === 0) {
			// Schedule show:
			$timeout(function() {
				if (state.showWait > 0) {
					// $log.debug("_showWait timeout for show executing");
					spinnerService.show('s7Spinner');
					// Schedule hide
					if (!state.hideWaitScheduled) {
						// $log.debug("_hideWaitTimeout scheduled");
						state.hideWaitScheduled = true;
						$timeout(_hideWaitTimeout, minWaitDurationTimeMs);
					}
				} else {
					// $log.debug("_showWait timeout ignored");
				}
			}, delayDurationTimeMs);
		}
		state.showWait = 1;
	};

	var _hideWait = function() {
		state.showWait = 0;
		// $log.debug("_hideWait called, counter: " + state.showWait);
		if (!state.hideWaitScheduled) {
			_hideWaitTimeout();
		}
	};

	var _hideWaitTimeout = function() {
		// $log.debug("_hideWaitTimeout timeout called, counter: " +
		// state.showWait);
		if (state.showWait === 0) {
			spinnerService.hide('s7Spinner');
		}
		state.hideWaitScheduled = false;
	};

	return {
		// Request wait screen to be shown
		showWait : function() {
			_showWait();
		},
		hideWait : function() {
			_hideWait();
		}
	}
});

// This interceptor could be configurable (for URL patterns, or so ..)
savet7App.factory('waitServiceInterceptor', function($log, waitService) {

	var waitServiceInterceptor = {
		request : function(config) {
			if (config.url !== undefined && config.url.indexOf('/api/') >= 0) {
				// $log.debug("intercepted request: " + config.url);
				waitService.showWait();
			}
			return config;
		},
		requestError : function(rejection) {
			if (rejection.config !== v && rejection.config.url !== undefined && rejection.config.url.indexOf('/api/') >= 0) {
				// $log.debug("intercepted response: " + response.config.url);
				waitService.hideWait();
			}
			return rejection;
		},
		response : function(response) {
			if (response.config.url !== undefined && response.config.url.indexOf('/api/') >= 0) {
				// $log.debug("intercepted response: " + response.config.url);
				waitService.hideWait();
			}
			return response;
		},
		responseError : function(rejection) {
			if (rejection.config !== undefined && rejection.config.url !== undefined
					&& rejection.config.url.indexOf('/api/') >= 0) {
				// $log.debug("intercepted response: " + response.config.url);
				waitService.hideWait();
			}
			return rejection;
		}
	};

	return waitServiceInterceptor;
});

savet7App.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('waitServiceInterceptor');
} ]);
