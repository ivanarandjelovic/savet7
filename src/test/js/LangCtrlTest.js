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

  var $controller, $timeout, $httpBackend, $translate, langCtrl, langScope;

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

    langScope = {};
    langCtrl = $controller('langCtrl', {
      $scope : langScope
    });
  }));

  it('check default langData', function(done) {
    $httpBackend.flush();
    console.log($translate.use());
    $translate('TEXT').then(function(text) {
      expect(text).toBe('english');
      done();
    });
    expect(langScope.langData).not.toBeNull();
    expect(langScope.langData.langCd).toBe('en');
    $httpBackend.flush();
  });

  it('check change to rs lang', function(done) {
    langScope.useLang('rs');
    $httpBackend.flush();
    $translate('TEXT').then(function(text) {
      expect(text).toBe('serbian');
      done();
    });
    console.log($translate.use());
    expect(langScope.langData.langCd).toBe('rs');
    $httpBackend.flush();
  });

});
