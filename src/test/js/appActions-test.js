jest.dontMock('../../main/resources/dev_public/js/actions/appActions');

describe('appActions', function() {
  it('should return new action when setting language', function() {
    var appActions = require('../../main/resources/dev_public/js/actions/appActions');
    appActions.setLanguage('en');
  });
});
