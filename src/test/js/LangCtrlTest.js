describe("LangCtrl test", function() {

  var en_json = {
    "TEXT" : "english"
  };
  var rs_json = {
    "TEXT" : "serbian"
  };

  beforeEach(function() {
    module('savet7App');
  });
  
  beforeEach(function() {
    module('/partials/building-list.html');
  });
  

  var $controller, $timeout, $httpBackend,$translate;

  beforeEach(inject(function(_$controller_, _$timeout_, _$httpBackend_, _$translate_) {
    // The injector unwraps the underscores (_) from around the parameter names
    // when matching
    $controller = _$controller_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    $translate = _$translate_;

    $httpBackend.when('GET', '/translations/en.json').respond(function() {
      return [ 200, en_json, {} ];
    });
    $httpBackend.when('GET', '/translations/rs.json').respond(function() {
      return [ 200, rs_json, {} ];
    });
  }));

  it('check default langData', function() {
    var $scope = {};
    var controller = $controller('langCtrl', {
      $scope : $scope
    });
    //$timeout.flush();
    $httpBackend.flush();
    expect($scope.langData).not.toBeNull();
    expect($scope.langData.langCd).toBe('en');
  });

  it('check change to rs lang', function() {
    var $scope = {};
    var controller = $controller('langCtrl', {
      $scope : $scope
    });
    //$timeout.flush();
    $scope.useLang('rs');
    //$timeout.flush();
    $httpBackend.flush();
    expect($scope.langData.langCd).toBe('rs');
  });

});
