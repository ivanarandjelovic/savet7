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
var getServiceHandler;
  
  
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

    getServiceHandler = $httpBackend.when('GET','/userService/get').respond(function() {
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
    getServiceHandler.respond(200,user_get_logged_in);
    userScope.loadUser();
    $httpBackend.flush();

    expect(userScope.loggedIn).toBeTruthy();
  });

  it('when service returns error', function() {
    $httpBackend.expectGET('/userService/get').respond(200,user_get_logged_in);
    userScope.loadUser();
    $httpBackend.flush();

    expect(userScope.loggedIn).toBeTruthy();

    $httpBackend.expectGET('/userService/get').respond(401, null);

    userScope.loadUser();
    $httpBackend.flush();

    expect(userScope.loggedIn).toBeFalsy();
  });

  it('when logged in then logout', function() {

    $httpBackend.expectGET('/userService/get').respond(200,user_get_logged_in);
    userScope.loadUser();
    $httpBackend.flush();
    expect(userScope.loggedIn).toBeTruthy();

    $httpBackend.expectGET('/logout').respond(200, null);
    userScope.logout();
    $httpBackend.flush();

    expect(userScope.loggedIn).toBeFalsy();
  });

});
