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

  var $controller, $timeout, $httpBackend, $translate, userCtrl, userScope, $rootScope, $timeout;

  beforeEach(inject(function(_$controller_, _$timeout_, _$httpBackend_, _$translate_, _$rootScope_, _$timeout_) {
    // The injector unwraps the underscores (_) from around the parameter names
    // when matching
    $controller = _$controller_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    $translate = _$translate_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;

    $httpBackend.when('GET', '/translations/en.json').respond(function() {
      return [ 200, en_json, {} ];
    });
    $httpBackend.when('GET', '/translations/rs.json').respond(function() {
      return [ 200, rs_json, {} ];
    });

    userScope = $rootScope.$new();
    userCtrl = $controller('userCtrl', {
      $scope : userScope
    });
  }));

  it('initial state', function() {
    $httpBackend.when('GET', '/userService/get').respond(function() {
      return [ 200, user_get_not_logged_in, {} ];
    });
    expect(userScope.loggedIn).toBeFalsy();
  });

  it('when logged in', function() {
    $httpBackend.when('GET', '/userService/get').respond(function() {
      return [ 200, user_get_logged_in, {} ];
    });
    userScope.loadUser();
    $httpBackend.flush();
    expect(userScope.loggedIn).toBeTruthy();
  });
  
  it('when logged in then logout', function() {
    
    $httpBackend.when('GET', '/userService/get').respond(function() {
      return [ 200, user_get_logged_in, {} ];
    });
    userScope.loadUser();
    $httpBackend.flush();
    expect(userScope.loggedIn).toBeTruthy();
    
    $httpBackend.when('GET', '/logout').respond(function() {
      return [ 200, {}, {} ];
    });
    userScope.logout();
    $httpBackend.flush();
    expect(userScope.loggedIn).toBeFalsy();
  });

});
