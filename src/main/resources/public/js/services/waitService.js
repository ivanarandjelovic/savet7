// Just holds state for now ...
savet7App.factory('waitService', function(spinnerService, $log, $timeout) {

    // Once shown, wait screen will be visible at least this much milliseconds.
    var minWaitDurationTimeMs = 300;

    // Wait show delay time. If request to hide comes sooner, we will not show
    // wait screen at all
    var delayDurationTimeMs = 500;

    var state = {
        showWait : 0,
        hideWaitScheduled : false
    };

    var _hideWaitTimeout = function() {
        if (state.showWait === 0) {
            spinnerService.hide('s7Spinner');
        }
        state.hideWaitScheduled = false;
    };

    var _showWait = function() {

        if (state.showWait === 0) {
            // Schedule show:
            $timeout(function() {
                if (state.showWait > 0) {
                    spinnerService.show('s7Spinner');
                    // Schedule hide
                    if (!state.hideWaitScheduled) {
                        state.hideWaitScheduled = true;
                        $timeout(_hideWaitTimeout, minWaitDurationTimeMs);
                    }
                } else {
                    // do nothing
                }
            }, delayDurationTimeMs);
        }
        state.showWait = 1;
    };

    var _hideWait = function() {
        state.showWait = 0;
        if (!state.hideWaitScheduled) {
            _hideWaitTimeout();
        }
    };

    return {
        // Request wait screen to be shown
        showWait : function() {
            _showWait();
        },
        hideWait : function() {
            _hideWait();
        }
    };
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
            if (rejection.config !== v && rejection.config.url !== undefined
                    && rejection.config.url.indexOf('/api/') >= 0) {
                // $log.debug("intercepted response: " + response.config.url);
                waitService.hideWait();
            }
            return rejection;
        },
        response : function(response) {
            if (response.config.url !== undefined
                    && response.config.url.indexOf('/api/') >= 0) {
                // $log.debug("intercepted response: " + response.config.url);
                waitService.hideWait();
            }
            return response;
        },
        responseError : function(rejection) {
            if (rejection.config !== undefined
                    && rejection.config.url !== undefined
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
