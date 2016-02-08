describe('appActions', function() {
  it('should return new action when setting language', function() {
    var appActions = require.requireActual('../../main/resources/dev_public/js/actions/appActions');
    appActions.setLanguage('en');
  });
});
