import $ from 'jquery'

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
  }

};

module.exports = loginActions;
