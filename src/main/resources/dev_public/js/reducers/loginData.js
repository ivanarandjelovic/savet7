var loginData = function(state = {
  username: null,
  loggedIn: false
}, action) {

  if (action.type === 'LOGIN_ACTION') {
    state = {
      username: action.username,
      loggedIn: (!!action.username ? true : false),
      loginFailed: action.loginFailed,
      loginSuccess: action.loginSuccess,
      logoutSuccess: action.logoutSuccess
    };
  }

  return state;
}

module.exports = loginData;
