var rootReducer = function(state, action) {

  var newState = {};

  if (state === undefined) {
    newState = {
      loginData: {
        username: null,
        loggedIn: false
      },
      appData: {
        langCd: undefined
      },
      data: {
        buildings: undefined
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

  if (action.type === 'APP_ACTION_LANGUAGE') {
    newState.appData.langCd = action.langCd;
  }

  if (action.type === 'BUILDINGS_SET') {
    newState.data = {
      buildings: action.buildings
    };
  }

  return newState;
}

module.exports = rootReducer;
