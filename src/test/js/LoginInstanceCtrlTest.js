describe("LoginInstanceCtrl test", function() {

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
  var fakeModal;

  var $controller, $timeout, $httpBackend, $translate, loginCtrl, loginScope, $rootScope, $timeout, $uibModal;
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

    $httpBackend.when('GET', '/translations/en.json').respond(function() {
      return [ 200, en_json, {} ];
    });
    $httpBackend.when('GET', '/translations/rs.json').respond(function() {
      return [ 200, rs_json, {} ];
    });

    getUserServiceHandler = $httpBackend.when('GET', '/userService/get').respond(function() {
      return [ 200, user_get_not_logged_in, {} ];
    });
    
    fakeModal = {
      dismissValue : 'none',
      closeValue : 0,
      result : {
        then : function(confirmCallback, cancelCallback) {
          // Store the callbacks for later when the user clicks on the OK or
          // Cancel button of the dialog
          this.confirmCallBack = confirmCallback;
          this.cancelCallback = cancelCallback;
        }
      },
      close : function(item) {
        this.closeValue = item;
      },
      dismiss : function(type) {
        this.dismissValue = type;
      }
    };

    loginScope = $rootScope.$new();
    loginCtrl = $controller('loginInstanceCtrl', {
      $scope : loginScope,
      $uibModalInstance : fakeModal
    });
  }));

  it('login with Cancel button', function() {
    loginScope.cancel();
    expect(fakeModal.dismissValue).toBe('cancel');
  });

  it('login with Ok button and OK response', function() {
    loginScope.username = 'test';
    loginScope.password = 'test';
    $httpBackend.expectPOST('/login').respond(200);
    loginScope.login();
    $httpBackend.flush();
    expect(fakeModal.closeValue).toBe(1);
  });

  it('login with Ok button and BAD response', function() {
    loginScope.username = 'test';
    loginScope.password = 'test';
    $httpBackend.resetExpectations();
    var auth = $httpBackend.when('POST','/login').respond(401);
    auth.respond(401,'');
    loginScope.login();
    $httpBackend.flush();
    expect(fakeModal.closeValue).toBe(0);
  });

});
