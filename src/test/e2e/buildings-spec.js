var testUtil = require('./util/TestUtil.js');

describe('savet7 buildings test', function() {
  var title = element(by.css('.navbar-brand'));
  var langSelectLink = element(by.id("langSelectLink"));
  var loginLink = element(by.id("loginLink"));
  var logoutLink = element(by.id("logoutLink"));
  var usernameInNav = element(by.id("usernameInNav"));
  var nameField = element(by.id('name'));
  var saveButton = element(by.css('[ng-click="submit()"]'));
  var cancelButton = element(by.css('[ng-click="cancel()"]'));
  var editBuildingButton = element(by.css('[ng-click="edit()"]'));
  var editAddressButton = element(by.css('[ng-click="editAddress()"]'));
  var streetField = element(by.model('address.street'));
  var backButton = element(by.linkText('Back'));

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
      expect(element(by.repeater('building in buildings').row(0).column('building.name')).getText())
          .toBeDefined();
      // Go to page "2"
      element.all(by.repeater('page in pages')).then(
          function(page) {
            page[1].element(by.css('a')).click().then(
                function() {
                  expect(element(by.repeater('building in buildings').row(0).column('building.name')).getText())
                      .toBeDefined();
                });
          });
      // Go to page "3"
      element.all(by.repeater('page in pages')).then(
          function(page) {
            page[2].element(by.css('a')).click().then(
                function() {
                  expect(element(by.repeater('building in buildings').row(0).column('building.name')).getText())
                      .toBeDefined();
                });
          });
    });
  });

  it('should add new building with error', function(done) {
    loggedInTest(done, function() {
      element(by.linkText('Add building')).click();
      expect(element(by.css('h2')).getText()).toBe('Add new building:');
      nameField.sendKeys('shor');
      expect(element(by.css('[ng-show="showError(\'name\')"]')).getInnerHtml()).toContain(
          'Field is too short or missing.');
      saveButton.click();
      expect(element(by.css('[ng-show="showFormError"]')).element(by.css('.with-errors')).getInnerHtml()).toContain(
          'Form submission failed, please see details below.');
      cancelButton.click();
      expect(element(by.tagName('h3')).getText()).toBe('Building list');
    });
  });

  it('should add new building then edit it', function(done) {
    loggedInTest(done, function() {
      element(by.linkText('Add building')).click();
      expect(element(by.css('h2')).getText()).toBe('Add new building:');
      nameField.sendKeys('Long name');
      expect(element(by.css('[ng-show="showError(\'name\')"]')).isDisplayed()).toBeFalsy();
      saveButton.click();
      expect(element(by.css('.panel-title')).getText()).toBe('Building details');
      expect(element(by.binding('building.name')).getText()).toBe('Long name');
      editBuildingButton.click();
      nameField.sendKeys('-2');
      saveButton.click();
      expect(element(by.css('.panel-title')).getText()).toBe('Building details');
      expect(element(by.binding('building.name')).getText()).toBe('Long name-2');
      editAddressButton.click();
      streetField.sendKeys('address 12345');
      saveButton.click();
      expect(element(by.css('.panel-title')).getText()).toBe('Building details');
      expect(element(by.binding('address.street')).getText()).toBe('address 12345');
      backButton.click();
      expect(element(by.tagName('h3')).getText()).toBe('Building list');
    });
  });

  it('should edit building then edit address', function(done) {
    var newBuildingName = "building_test_" + (new Date());
    loggedInTest(done, function() {
      element.all(by.repeater('building in buildings')).then(
          function(rows) {
            rows[0].element(by.css('a')).getText().then(
                function(text) {
                  buildingName = text;

                  element(by.linkText(buildingName)).click();
                  expect(element(by.css('.panel-title')).getText()).toBe('Building details');
                  expect(element(by.binding('building.name')).getText()).toBe(buildingName);
                  editBuildingButton.click();
                  nameField.clear();
                  nameField.sendKeys(newBuildingName);
                  saveButton.click();
                  expect(element(by.binding('building.name')).getText()).toBe(newBuildingName);
                  editAddressButton.click();
                  streetField.clear();
                  streetField.sendKeys('address xx');
                  saveButton.click();
                  expect(element(by.css('.panel-title')).getText()).toBe('Building details');
                  expect(element(by.binding('address.street')).getText()).toContain('address xx');
                  expect(element(by.binding('building.name')).getText()).toBe(newBuildingName);
                  backButton.click();
                  expect(element(by.tagName('h3')).getText()).toBe('Building list');
                  expect(element(by.repeater('building in buildings').row(0).column('building.name')).getText()).toBe(
                      newBuildingName);
                  expect(element(by.repeater('building in buildings').row(0).column('address.street')).getText())
                      .toContain('address xx');

                });
          });
    });
  });

});