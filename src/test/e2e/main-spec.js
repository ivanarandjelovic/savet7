var testUtil = require('./util/TestUtil.js');

describe('savet7 homepage test', function() {
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
  
  it('should check initial text and default language', function() {
    expect(title.getText()).toEqual('Savet7');
    expect(langSelectLink.getText()).toEqual("English");
    expect(loginLink.isPresent()).toBeTruthy();
    expect(usernameInNav.isPresent()).toBeFalsy();
    expect(element(by.id('buildingListNotLoggedIn')).isPresent()).toBeTruthy();
  });

  it('should switch to serbian and test initial text', function() {
    expect(langSelectLink.getText()).toEqual("English");
    langSelectLink.click();
    element(by.linkText("Serbian")).click();
    expect(langSelectLink.getText()).toEqual("Srpski");
    expect(loginLink.isPresent()).toBeTruthy();
    expect(usernameInNav.isPresent()).toBeFalsy();
    expect(element(by.id('buildingListNotLoggedIn')).isPresent()).toBeTruthy();
    expect(element(by.tagName('h3')).getText()).toBe('Lista zgrada');
  });

  it('sgould login', function() {
    testUtil.login();
  });
  
  it('sgould show buildings and iterate pages', function() {
    testUtil.login();
    expect(element(by.repeater('building in buildings').row(0).column('building.name')).getText()).toBe('Test building 1');
  });

});