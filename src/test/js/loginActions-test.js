describe('loginActions', function() {

  var loginActions;

  beforeEach(function() {
    this.loginActions = require.requireActual('../../main/resources/dev_public/js/actions/loginActions');
  });

  it('should return action when setting username', function() {
    expect(this.loginActions.setUsername({username: 'test'})).toEqual({
      type: 'LOGIN_ACTION',
      username: 'test'
    });
  });

});
