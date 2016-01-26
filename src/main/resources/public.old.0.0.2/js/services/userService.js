// Holds info/state about the currently logged in user, and can get it frmo the server
// Also can do logout, and login
savet7App.factory('userService', function($http, $route, $location, $translate) {

  var userServiceState = {
    loggedIn : false,
    user : null
  };

  var _setUser = function(user) {
    userServiceState.user = user;
    if (user === null || user.username === null) {
      userServiceState.loggedIn = false;
    } else {
      userServiceState.loggedIn = true;
    }
  };

  var _reloadUser = function() {
    $http.get('/userService/get').then(function(response) {
      var user = response.data;
      _setUser(user);
      $route.reload();
    }, function() {
      // we are not logged in
      _setUser(null);
      $route.reload();
    });
  };

  var _logout = function() {
    $http.get('/logout').then(function() {
      _setUser(null);
      $translate('APP_LOGOUT_SUCCESS').then(function(text) {
        toastr.warning(text);
      });
      $location.path("/");
    });
  };

  var _login = function(username, password) {
    var config = {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    };

    var data = $.param({
      username : username,
      password : password
    });

    return $http.post('/login', data, config);
  };

  _reloadUser();

  return {

    isLoggedIn : function() {
      return userServiceState.loggedIn;
    },

    getUser : function() {
      return userServiceState.user;
    },

    setUser : _setUser,

    reloadUser : _reloadUser,

    logout : _logout,

    login : _login
  };
});