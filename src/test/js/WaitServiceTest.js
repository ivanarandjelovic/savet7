describe("WaitService test", function() {

  var waitServiceObj;
  var waitServiceInterceptorObj;
  var spinnerServiceObj;
  var s7spinner = spinnerMock('s7Spinner');
  var timeout;
  var interceptorConfigForApi = {
    url : "/api/something"
  };
  var interceptorConfigNotForApi = {
    url : "/apiNOT/something"
  };
  var generalResponseApi = {
    config : interceptorConfigForApi
  };
  var generalResponseNotApi = {
    config : interceptorConfigNotForApi
  };
  var delayDurationTimeMs;
  var minWaitDurationTimeMs;


  beforeEach(function() {
    module('savet7App');
  });

  beforeEach(inject(function(waitService, waitServiceInterceptor, spinnerService, $timeout, $httpBackend, $rootScope) {
    waitServiceObj = waitService;
    waitServiceInterceptorObj = waitServiceInterceptor;
    spinnerServiceObj = spinnerService;
    timeout = $timeout;
    this.$rootScope=$rootScope;

    $httpBackend.when('GET', '/translations/en.json').respond('');
    $httpBackend.when('GET', '/translations/rs.json').respond('');

    // register our spinner
    spinnerServiceObj._register(s7spinner);
    
    delayDurationTimeMs = waitServiceObj.getDelayDurationTimeMs();
    minWaitDurationTimeMs = waitServiceObj.getMinWaitDurationTimeMs();
    
  }));

  it('should initially return state with default values', function() {
    var initialState = waitServiceObj.getState();
    expect(initialState.showWait).toEqual(0);
    expect(initialState.hideWaitScheduled).toBeFalsy();
  });

  it('should returned state must not be reference to real state, rather a clone', function() {
    var initialState = waitServiceObj.getState();
    initialState.showWait = 1;
    initialState.hideWaitScheduled = true;
    var newState = waitServiceObj.getState();
    expect(newState.showWait).toEqual(0);
    expect(newState.hideWaitScheduled).toBeFalsy();
  });

  it('should change state according to public show/hide calls', function() {
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();
    waitServiceObj.hideWait();
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();
    timeout.flush();
  });

  it('sshould show spinner according to sequence of show/hide calls', function() {
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    // Now move time forward but only a little bit:
    timeout.flush(delayDurationTimeMs-1);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    // Now move time a lot forward:
    timeout.flush(2);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceObj.hideWait();
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    // Finaly, it should become invisible
    timeout.flush(minWaitDurationTimeMs);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

  });

  it('should show spinner in more complex event sequence', function() {
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    // Now move time forward but only a little bit:
    timeout.flush(delayDurationTimeMs-1);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    // ask again to show it
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    // Now move time a lot forward:
    timeout.flush(2);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    // ask again to show it
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceObj.hideWait();
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    // ask again to hide it after small pause
    timeout.flush(minWaitDurationTimeMs-1);
    waitServiceObj.hideWait();
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    // Finaly, it should become invisible
    timeout.flush(2);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

  });

  it('should show spinner for route changes', function() {
    this.$rootScope.$emit('$routeChangeStart', { event: null});
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    timeout.flush(delayDurationTimeMs+1);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    this.$rootScope.$emit('$routeChangeSuccess', { event: null});
    timeout.flush(minWaitDurationTimeMs+1);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();
  });

  it('should show spinner for route changes with error', function() {
    this.$rootScope.$emit('$routeChangeStart', { event: null});
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    timeout.flush(delayDurationTimeMs+1);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    this.$rootScope.$emit('$routeChangeError', { event: null});
    timeout.flush(minWaitDurationTimeMs+1);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();
  });

  it('should show spinner for successfull calls to API', function() {
    waitServiceInterceptorObj.request(interceptorConfigForApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    // Now move time forward but only a little bit:
    timeout.flush(delayDurationTimeMs-1);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    // Now move time a lot forward:
    timeout.flush(2);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceInterceptorObj.response(generalResponseApi);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();

    // Finaly, it should become invisible
    timeout.flush(minWaitDurationTimeMs+1);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

  });

  it('should show spinner for failed calls to API', function() {
    waitServiceInterceptorObj.request(interceptorConfigForApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    timeout.flush(delayDurationTimeMs+1);
    
    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceInterceptorObj.requestError(generalResponseApi);
    timeout.flush(minWaitDurationTimeMs+1);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

  });
  
  it('should show spinner for failed calls to API - response error', function() {
    waitServiceInterceptorObj.request(interceptorConfigForApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

    timeout.flush(delayDurationTimeMs+1);
    
    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceInterceptorObj.responseError(generalResponseApi);
    timeout.flush(minWaitDurationTimeMs+1);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

  });

  it('should not show spinner when not API call', function() {
    
    // Request, but not for API, should not turn it on
    waitServiceInterceptorObj.request(interceptorConfigNotForApi);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();
   
    // Request for API, should turn it on
    waitServiceInterceptorObj.request(interceptorConfigForApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();
    
    timeout.flush(delayDurationTimeMs+1);
    
    // Request, but not for API, should not hide it
    waitServiceInterceptorObj.response(generalResponseNotApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeTruthy();
    expect(s7spinner.getState().visible).toBeTruthy();
    
    timeout.flush(minWaitDurationTimeMs+1);
    
    // Still visible
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeTruthy();
    
    // This should hide it immediately
    waitServiceInterceptorObj.response(generalResponseApi);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toBeFalsy();
    expect(s7spinner.getState().visible).toBeFalsy();

  });
  
  
});
