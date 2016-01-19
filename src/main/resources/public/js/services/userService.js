// Holds info/state about the currently logged in user
savet7App.factory('userService', function() {

  var userServiceState = {
    loggedIn : false,
    user : null
  };

  return {

    isLoggedIn : function() {
      return userServiceState.loggedIn;
    },

    getUser : function() {
      return userServiceState.user;
    },

    setUser : function(user) {
      userServiceState.user = user;
      if (user === null || user.username === null) {
        userServiceState.loggedIn = false;
      } else {
        userServiceState.loggedIn = true;
      }
    }
  };
});