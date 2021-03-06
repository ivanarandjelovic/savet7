// Just holds state for now ...
savet7App.factory('waitService', function(spinnerService, $timeout) {

  // Wait show delay time. If request to hide comes sooner, we will not show
  // wait screen at all
  var delayDurationTimeMs = 500;

  // Once shown, wait screen will be visible at least this much milliseconds.
  var minWaitDurationTimeMs = 300;

  var state = {
    showWait : 0,
    hideWaitScheduled : false
  };

  var _hideWaitTimeout = function() {
    if (state.showWait === 0) {
      try {
        spinnerService.hide('s7Spinner');
      } catch (err) {
        // Can happen during unit testing
      }
    }
    state.hideWaitScheduled = false;
  };

  var _showWait = function() {

    if (state.showWait === 0) {
      // Schedule show:
      $timeout(function() {
        if (state.showWait > 0) {
          try {
            spinnerService.show('s7Spinner');
          } catch (err) {
            // Can happend during unit tests
          }
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
    state.showWait = state.showWait + 1;
  };

  var _hideWait = function() {
    state.showWait = Math.max(state.showWait - 1, 0);
    if (!state.hideWaitScheduled) {
      _hideWaitTimeout();
    }
  };

  return {
    // Request wait screen to be shown - default when parameter absent (or
    // hidden, if the parameter is false)
    showWait : function(showFlag) {
      if (showFlag === undefined || showFlag) {
        _showWait();
      } else {
        _hideWait();
      }
    },
    hideWait : function() {
      _hideWait();
    },
    getState : function() {
      return _.clone(state);
    },
    getMinWaitDurationTimeMs : function() {
      return minWaitDurationTimeMs;
    },
    getDelayDurationTimeMs : function() {
      return delayDurationTimeMs;
    }
  };
});

// This interceptor could be configurable (for URL patterns, or so ..)
savet7App.factory('waitServiceInterceptor', function($q, waitService) {

  // Check if the request/response is for some API call and show/hide wait if it
  // is.
  var processIfIsForApi = function(config, show) {
    if (config !== undefined && config.url !== undefined && config.url.indexOf('/api/') >= 0) {
      waitService.showWait(show);
    }
  };

  var waitServiceInterceptor = {
    request : function(config) {
      processIfIsForApi(config, true);
      return config;
    },
    requestError : function(rejection) {
      processIfIsForApi(rejection.config, false);
      return $q.reject(rejection);
    },
    response : function(response) {
      processIfIsForApi(response.config, false);
      return response;
    },
    responseError : function(rejection) {
      processIfIsForApi(rejection.config, false);
      return $q.reject(rejection);
      ;
    }
  };

  return waitServiceInterceptor;
});

savet7App.config([ '$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('waitServiceInterceptor');
} ]);
