import $ from 'jquery'
import toastr from 'toastr'

var loginActions = {


  setUsername: (json) => {
    return {
      type: 'LOGIN_ACTION',
      username: json.username
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
        dispatch(loginActions.fetchUser())
        //toastr.success("You have been logged in");
      });
    }
  },

  logout: () => {
    return dispatch => {
      $.post('http://localhost:8080/logout', null, (data) => {
        dispatch(loginActions.fetchUser());
        //toastr.warning("You have been logged out");
      });
    }
  }

};

module.exports = loginActions;
