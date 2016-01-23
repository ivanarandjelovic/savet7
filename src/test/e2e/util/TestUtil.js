var EC = protractor.ExpectedConditions;

// Login and wait for toastr to close
var login = function(done) {
  var deferred = protractor.promise.defer();
  var usernameInNav = element(by.id("usernameInNav"));
  var langSelectLink = element(by.id("langSelectLink"));
  var lang = langSelectLink.getText();
  var toast;

  element(by.id("loginLink")).click();
  element(by.model('username')).sendKeys('user');
  element(by.model('password')).sendKeys('user');
  element(by.css('.modal-footer .btn-primary')).click().then(function() {
    toast = element(by.css('.toast-message'));
    browser.wait(EC.visibilityOf(toast), 20000) // wait until toast is displayed
    .then(function() {
      var message = '';
      lang.then(function(activeLang) {
        if (activeLang === "English") {
          message = 'You are logged in';
        } else {
          message = 'Ulogovani ste';
        }
        expect(toast.getText()).toBe(message);
        browser.wait(EC.stalenessOf(toast), 20000).then(function() {
          deferred.fulfill();
        });
      });
    });
  });
  expect(element(by.id('usernameInNav')).getText()).toBe('user');
  return deferred.promise;
}

var logout = function(done) {
  var deferred = protractor.promise.defer();

  var usernameInNav = element(by.id("usernameInNav"));
  var toast;

  toast = element(by.css('.toast-message'));

  // Logout at once, no need to wait for toast to hide
  _logout(deferred);
  expect(usernameInNav.isPresent()).toBeFalsy();
  return deferred.promise;
}

var _logout = function(deferred) {
  var toast;

  var langSelectLink = element(by.id("langSelectLink"));
  var lang = langSelectLink.getText();
  element(by.id("logoutLink")).click().then(function() {
    toast = element(by.css('.toast-message'));
    browser.wait(EC.visibilityOf(toast), 20000) // wait until toast is
    // displayed
    .then(function() {
      var message = '';
      lang.then(function(activeLang) {
        if (activeLang === "English") {
          message = 'You have been logged out';
        } else {
          message = 'Izlogovani ste';
        }
        expect(toast.getText()).toBe(message);
        browser.wait(EC.stalenessOf(toast), 20000).then(function() {
          deferred.fulfill();
        });
      });
    });
  });
};

exports.login = login;
exports.logout = logout;
