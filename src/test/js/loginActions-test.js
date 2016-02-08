describe('loginActions', function() {

  var loginActions;
  var userObj = {
    username: "test"
  };
  var loginAction = {
    type: 'LOGIN_ACTION',
    username: 'test'
  };
  var username = "user";
  var password = "pwd";

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
    $.get.mock.calls[0 /*first call*/ ][1 /*second argument*/ ](userObj);
    expect(dispatch).toBeCalledWith(loginAction);
  });

  it('should simulate login action', function() {
    var $ = require('jquery');
    var PubSubJs = require('pubsub-js');

    var action = loginActions.login(username, password);
    expect(typeof action).toBe('function');
    var dispatch = jest.genMockFunction();

    // Prepare mock value returned from $.post
    var returnValue = {};
    var func = null;
    returnValue.fail = function(f) {
      func = f;
    };
    $.post.mockReturnValueOnce(returnValue);

    action(dispatch);

    expect($.post.mock.calls.length).toEqual(1);
    expect($.post).toBeCalledWith({
      url: 'http://localhost:8080/login',
      xhrFields: {
        withCredentials: true
      }
    }, {
      username, password
    }, jasmine.any(Function));
    // Simulate return data from api call:
    $.post.mock.calls[0 /*first call*/ ][2 /*third argument*/ ](null);
    expect(dispatch).toBeCalledWith(jasmine.any(Function));
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'LOGIN_ACTION',
      loginSuccess: true
    });
    expect(PubSubJs.publish).lastCalledWith('LOGIN', null);

    // Now check if failed request would be handled OK:
    expect(func).not.toBeNull();
    //returnValue.fail();
    func();
    expect(dispatch.mock.calls[2][0]).toEqual({
      type: 'LOGIN_ACTION',
      loginFailed: true
    });

    expect(PubSubJs.publish).lastCalledWith('LOGIN_ERROR', null);
  });

  it('should test logout action', function() {
    var $ = require('jquery');
    var PubSubJs = require('pubsub-js');

    var action = loginActions.logout();
    expect(typeof action).toBe('function');
    var dispatch = jest.genMockFunction();
    action(dispatch);

    expect($.post.mock.calls.length).toEqual(1);
    expect($.post).toBeCalledWith({
      url: 'http://localhost:8080/logout',
      xhrFields: {
        withCredentials: true
      }
    }, null, jasmine.any(Function));
    // Simulate return data from api call:
    $.post.mock.calls[0 /*first call*/ ][2 /*third argument*/ ](null);
    expect(dispatch).toBeCalledWith(jasmine.any(Function));
    expect(dispatch).toBeCalledWith({
      type: 'LOGIN_ACTION',
      logoutSuccess: true
    });
    expect(PubSubJs.publish).lastCalledWith('LOGOUT', null);
  });

});
