var $ = require('jquery');
var PubSubJs = require('pubsub-js');

var loginActions = {


  setUsername: (json) => {
    return {
      type: 'LOGIN_ACTION',
      username: json.username
    }
  },

  fetchUser: () => {
    return dispatch => {
      $.get({
          url: 'http://localhost:8080/userService/get',
          xhrFields: {
            withCredentials: true
          }
        }, (data) =>
        dispatch(loginActions.setUsername(data)) // Use a normal function to set the received state
      );
    }
  },

  login: (username, password) => {
    return dispatch => {
      $.post({
          url: 'http://localhost:8080/login',
          xhrFields: {
            withCredentials: true
          }
        }, {
        username, password
      }, (data) => {
        // Login success
        dispatch(loginActions.fetchUser());
        dispatch({
          type: 'LOGIN_ACTION',
          loginSuccess: true
        });
        PubSubJs.publish( 'LOGIN', null);
      }).fail(() => {
        // Login failed:
        dispatch({
          type: 'LOGIN_ACTION',
          loginFailed: true
        });
        PubSubJs.publish( 'LOGIN_ERROR', null);
      });
    }
  },

  logout: () => {
    return dispatch => {
      $.post({
          url: 'http://localhost:8080/logout',
          xhrFields: {
            withCredentials: true
          }
        }, null, (data) => {
        dispatch(loginActions.fetchUser());
        dispatch({
          type: 'LOGIN_ACTION',
          logoutSuccess: true
        });
        PubSubJs.publish( 'LOGOUT', null);
      });
    }
  }

};

module.exports = loginActions;
