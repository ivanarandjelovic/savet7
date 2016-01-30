var Redux = require('redux');

var s7Reducer = function(state, action) {

  var newState = {};

  if (state === undefined) {
    newState = {
      loginData : {
        username : 'Mike'
      }
    };
  }

  newState = Object.assign(newState, state);

  if (action.type === 'LOGIN_ACTION') {
    newState.loginData.username = action.username;
  }

  return newState;

}

var s7Store = Redux.createStore(s7Reducer);

var logger = function() {
  console.log("s7Store: ", s7Store.getState());
};

var unsubLogger = s7Store.subscribe(logger);

/*s7Store.dispatch({
  type : "LOG_STORE",
  username : null
});

s7Store.dispatch({
  type : "LOGIN_ACTION",
  username : null
});

s7Store.dispatch({
  type : "LOGIN_ACTION",
  username : "Spike"
});*/

module.exports = s7Store;