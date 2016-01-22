var login = function() {
  element(by.id("loginLink")).click();
  element(by.model('username')).sendKeys('user');
  element(by.model('password')).sendKeys('user');
  element(by.css('.modal-footer .btn-primary')).click();
  expect(element(by.id('usernameInNav')).getText()).toBe('user');
}

exports.login = login;
