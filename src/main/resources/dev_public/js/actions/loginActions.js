import $ from 'jquery'
import toastr from 'toastr'

var loginActions = {


  setUsername: (json) => {
    return {
      type: 'LOGIN_ACTION',
      username: json.username
    }
  },

  clearLoginData : () => {
    return {
      type: 'LOGIN_ACTION',
      loginFailed: false,
      loginSuccess: false
    }
  },

  fetchUser: () => {
    return dispatch => {
      $.get('http://localhost:8080/userService/get', (data) =>
        dispatch(loginActions.setUsername(data)) // Use a normal function to set the received state
      );
    }
  },

  login: (username, password) => {
    return dispatch => {
      $.post('http://localhost:8080/login', {
        username, password
      }, (data) => {
        // Login success
        dispatch(loginActions.fetchUser());
        dispatch({type: 'LOGIN_ACTION', loginSuccess : true});
      }).fail(() => {
        // Login failed:
        dispatch({type: 'LOGIN_ACTION', loginFailed : true});
      });
    }
  },

  logout: () => {
    return dispatch => {
      $.post('http://localhost:8080/logout', null, (data) => {
        dispatch(loginActions.fetchUser());
        dispatch({type: 'LOGIN_ACTION', logoutSuccess : true});
      });
    }
  }

};

module.exports = loginActions;
