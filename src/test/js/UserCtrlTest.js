describe("UserCtrl test", function() {

  var en_json = {
    "TEXT" : "english"
  };
  var rs_json = {
    "TEXT" : "serbian"
  };

  var user_get_not_logged_in = {
    "username" : null
  };

  var user_get_logged_in = {
    "username" : "mike"
  };

  beforeEach(function() {
    module('savet7App');
  });

  beforeEach(function() {
    module('/partials/building-list.html');
  });

  // Mock uibModal.open result
  var fakeModal = {
    result : {
      then : function(confirmCallback, cancelCallback) {
        // Store the callbacks for later when the user clicks on the OK or
        // Cancel button of the dialog
        this.confirmCallBack = confirmCallback;
        this.cancelCallback = cancelCallback;
      }
    },
    close : function(item) {
      // The user clicked OK on the modal dialog, call the stored confirm
      // callback with the selected item
      this.result.confirmCallBack(item);
    },
    dismiss : function(type) {
      // The user clicked cancel on the modal dialog, call the stored cancel
      // callback
      if (this.cancelCallback) {
        this.result.cancelCallback(type);
      }
    }
  };

  var $controller, $timeout, $httpBackend, $translate, userCtrl, userScope, $rootScope, $timeout, $uibModal;
  var getServiceHandler;

  beforeEach(inject(function(_$controller_, _$timeout_, _$httpBackend_, _$translate_, _$rootScope_, _$timeout_,
      _$uibModal_) {
    // The injector unwraps the underscores (_) from around the parameter names
    // when matching
    $controller = _$controller_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    $translate = _$translate_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $uibModal = _$uibModal_;

    spyOn($uibModal, 'open').and.returnValue(fakeModal);

    $httpBackend.when('GET', '/translations/en.json').respond(function() {
      return [ 200, en_json, {} ];
    });
    $httpBackend.when('GET', '/translations/rs.json').respond(function() {
      return [ 200, rs_json, {} ];
    });

    getServiceHandler = $httpBackend.when('GET', '/userService/get').respond(function() {
      return [ 200, user_get_not_logged_in, {} ];
    });
    userScope = $rootScope.$new();
    userCtrl = $controller('userCtrl', {
      $scope : userScope
    });
    $httpBackend.flush();
  }));

  it('initial state', function() {
    expect(userScope.loggedIn).toBeFalsy();
  });

  it('when logged in', function() {

    $httpBackend.expectGET('/userService/get');
    getServiceHandler.respond(200, user_get_logged_in);
    userScope.loadUser();
    $httpBackend.flush();

    expect(userScope.loggedIn).toBeTruthy();
  });

  it('when service returns error', function() {
    $httpBackend.expectGET('/userService/get').respond(200, user_get_logged_in);
    userScope.loadUser();
    $httpBackend.flush();

    expect(userScope.loggedIn).toBeTruthy();

    $httpBackend.expectGET('/userService/get').respond(401, null);

    userScope.loadUser();
    $httpBackend.flush();

    expect(userScope.loggedIn).toBeFalsy();
  });
  
  it('when logged in then logout', function() {

    $httpBackend.expectGET('/userService/get').respond(200, user_get_logged_in);
    userScope.loadUser();
    $httpBackend.flush();
    expect(userScope.loggedIn).toBeTruthy();

    $httpBackend.expectGET('/logout').respond(200, null);
    userScope.logout();
    $httpBackend.flush();

    expect(userScope.loggedIn).toBeFalsy();
  });

  it('login with OK button', function() {
    expect(userScope.loggedIn).toBeFalsy();
    userScope.login();
    $httpBackend.expectGET('/userService/get').respond(200, user_get_logged_in);
    fakeModal.close();
    $httpBackend.flush();
    expect(userScope.loggedIn).toBeTruthy();
  });

  it('login with Cancel button', function() {
    expect(userScope.loggedIn).toBeFalsy();
    userScope.login();
    fakeModal.dismiss();
    expect(userScope.loggedIn).toBeFalsy();
  });

});
