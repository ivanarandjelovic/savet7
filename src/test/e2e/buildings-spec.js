var testUtil = require('./util/TestUtil.js');

describe('savet7 buildings test', function() {
  var title = element(by.css('.navbar-brand'));
  var langSelectLink = element(by.id("langSelectLink"));
  var loginLink = element(by.id("loginLink"));
  var logoutLink = element(by.id("logoutLink"));
  var usernameInNav = element(by.id("usernameInNav"));

  var open = function() {
    // browser.get('https://pacific-gorge-58447.herokuapp.com/');
    browser.get(browser.params.baseUrl);
  }

  beforeEach(function() {
    browser.manage().deleteAllCookies();
    open();
  });

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  var loggedInTest = function(done, test) {
    testUtil.login().then(function() {
      test();
      testUtil.logout(done).then(function() {
        done();
      });
    });
  };

  it('Should iterate pages with buildings', function(done) {
    loggedInTest(done, function() {
      expect(element(by.repeater('building in buildings').row(0).column('building.name')).getText()).toBe(
          'Test building 1');
      element.all(by.repeater('page in pages').row(1)).then(
          function(page) {
            page[0].element(by.css('a')).click().then(
                function() {
                  expect(element(by.repeater('building in buildings').row(0).column('building.name')).getText()).toBe(
                      'Test building 21');
                });
          });
      element.all(by.repeater('page in pages').row(2)).then(
          function(page) {
            console.log(page[0]);
            page[0].element(by.css('a')).click().then(
                function() {
                  expect(element(by.repeater('building in buildings').row(0).column('building.name')).getText()).toBe(
                      'Test building 41');
                });
          });
    });
  });

});