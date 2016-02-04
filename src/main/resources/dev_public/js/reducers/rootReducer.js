var rootReducer = function(state, action) {

  var newState = {};

  if (state === undefined) {
    newState = {
      loginData : {
        username : null,
        loggedIn: false
      },
      appData: {
        langCd: undefined
      }
    };
  }

  newState = Object.assign(newState, state);

  if (action.type === 'LOGIN_ACTION') {
    newState.loginData = {
      username: action.username,
      loggedIn: (!!action.username ? true : false),
      loginFailed: action.loginFailed,
      loginSuccess: action.loginSuccess,
      logoutSuccess: action.logoutSuccess
    };
  }

  if(action.type === 'APP_ACTION_LANGUAGE') {
    newState.appData.langCd = action.langCd;
  }

  return newState;

}

module.exports = rootReducer;
