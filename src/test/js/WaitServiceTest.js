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

  beforeEach(function() {
    module('savet7App');
  });

  beforeEach(inject(function(waitService, waitServiceInterceptor, spinnerService, $timeout, $httpBackend) {
    waitServiceObj = waitService;
    waitServiceInterceptorObj = waitServiceInterceptor;
    spinnerServiceObj = spinnerService;
    timeout = $timeout;

    $httpBackend.when('GET', '/translations/en.json').respond('');

    // register our spinner
    spinnerServiceObj._register(s7spinner);
  }));

  it('should initially return state with default values', function() {
    var initialState = waitServiceObj.getState();
    expect(initialState.showWait).toEqual(0);
    expect(initialState.hideWaitScheduled).toEqual(false);
  });

  it('should returned state must not be reference to real state, rather a clone', function() {
    var initialState = waitServiceObj.getState();
    initialState.showWait = 1;
    initialState.hideWaitScheduled = true;
    var newState = waitServiceObj.getState();
    expect(newState.showWait).toEqual(0);
    expect(newState.hideWaitScheduled).toEqual(false);
  });

  it('should change state according to public show/hide calls', function() {
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);
    waitServiceObj.hideWait();
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);
  });

  it('sshould show spinner according to sequence of show/hide calls', function() {
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    // Now move time forward but only a little bit:
    timeout.flush(499);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    // Now move time a lot forward:
    timeout.flush(2);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);

    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceObj.hideWait();
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);

    // Finaly, it should become invisible
    timeout.flush(301);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

  });

  it('should show spinner in more complex event sequence', function() {
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    // Now move time forward but only a little bit:
    timeout.flush(499);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    // ask again to show it
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    // Now move time a lot forward:
    timeout.flush(2);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);

    // ask again to show it
    waitServiceObj.showWait();
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);

    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceObj.hideWait();
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);

    // ask again to hide it after small pause
    timeout.flush(299);
    waitServiceObj.hideWait();
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);

    // Finaly, it should become invisible
    timeout.flush(2);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

  });

  it('should show spinner for successfull calls to API', function() {
    waitServiceInterceptorObj.request(interceptorConfigForApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    // Now move time forward but only a little bit:
    timeout.flush(499);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    // Now move time a lot forward:
    timeout.flush(2);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);

    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceInterceptorObj.response(generalResponseApi);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);

    // Finaly, it should become invisible
    timeout.flush(301);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

  });

  it('should show spinner for failed calls to API', function() {
    waitServiceInterceptorObj.request(interceptorConfigForApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    timeout.flush(501);
    
    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceInterceptorObj.requestError(generalResponseApi);
    timeout.flush(301);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

  });
  
  it('should show spinner for failed calls to API - response error', function() {
    waitServiceInterceptorObj.request(interceptorConfigForApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

    timeout.flush(501);
    
    // Ask to hide it (but should be still visible, only hiding scheduled)
    waitServiceInterceptorObj.responseError(generalResponseApi);
    timeout.flush(301);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

  });

  it('should not show spinner when not API call', function() {
    
    // Request, but not for API, should not turn it on
    waitServiceInterceptorObj.request(interceptorConfigNotForApi);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);
   
    // Request for API, should turn it on
    waitServiceInterceptorObj.request(interceptorConfigForApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);
    
    timeout.flush(501);
    
    // Request, but not for API, should not hide it
    waitServiceInterceptorObj.response(generalResponseNotApi);
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(true);
    expect(s7spinner.getState().visible).toEqual(true);
    
    timeout.flush(301);
    
    // Still visible
    expect(waitServiceObj.getState().showWait).toEqual(1);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(true);
    
    // This should hide it immediately
    waitServiceInterceptorObj.response(generalResponseApi);
    expect(waitServiceObj.getState().showWait).toEqual(0);
    expect(waitServiceObj.getState().hideWaitScheduled).toEqual(false);
    expect(s7spinner.getState().visible).toEqual(false);

  });
  
  
});
