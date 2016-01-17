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
          } catch (err) {};
          
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
savet7App.factory('waitServiceInterceptor', function($q,waitService) {

  var waitServiceInterceptor = {
    request : function(config) {
      if (config.url !== undefined && config.url.indexOf('/api/') >= 0) {
        waitService.showWait();
      }
      return config;
    },
    requestError : function(rejection) {
      if (rejection.config !== undefined && rejection.config.url !== undefined
          && rejection.config.url.indexOf('/api/') >= 0) {
        waitService.hideWait();
      }
      return $q.reject(rejection);
    },
    response : function(response) {
      if (response.config.url !== undefined && response.config.url.indexOf('/api/') >= 0) {
        waitService.hideWait();
      }
      return response;
    },
    responseError : function(rejection) {
      if (rejection.config !== undefined && rejection.config.url !== undefined
          && rejection.config.url.indexOf('/api/') >= 0) {
        waitService.hideWait();
      }
      return $q.reject(rejection);;
    }
  };

  return waitServiceInterceptor;
});

savet7App.config([ '$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('waitServiceInterceptor');
} ]);
