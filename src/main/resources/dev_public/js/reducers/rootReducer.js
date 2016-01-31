var rootReducer = function(state, action) {

  var newState = {};

  if (state === undefined) {
    newState = {
      loginData : {
        username : null,
        loggedIn: false
      }
    };
  }

  newState = Object.assign(newState, state);

  if (action.type === 'LOGIN_ACTION') {
    newState.loginData = {
      username: action.username,
      loggedIn: (action.username === null ? false : true)
    };
  }

  return newState;

}

module.exports = rootReducer;
