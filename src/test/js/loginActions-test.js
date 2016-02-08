describe('loginActions', function() {

  var loginActions;
  var userObj = {username: "test"};
  var loginAction = {
    type: 'LOGIN_ACTION',
    username: 'test'
  };

  beforeEach(function() {
    loginActions = require.requireActual('../../main/resources/dev_public/js/actions/loginActions');
  });

  it('should return action when setting username', function() {
    expect(loginActions.setUsername(userObj)).toEqual(loginAction);
  });

  it('should return function when asking to fetch the user', function() {
    var action = loginActions.fetchUser();
    expect(typeof action).toBe('function');
    var dispatch = jest.genMockFunction();
    action(dispatch);

    var $ = require('jquery');
    expect($.get.mock.calls.length).toEqual(1);
    expect($.get).toBeCalledWith({
        url: 'http://localhost:8080/userService/get',
        xhrFields: {
          withCredentials: true
        }
      }, jasmine.any(Function));
     // Simulate return data from api call:
     $.get.mock.calls[0 /*first call*/][1 /*first argument*/](userObj);
     expect(dispatch).toBeCalledWith(loginAction);
  });


});
