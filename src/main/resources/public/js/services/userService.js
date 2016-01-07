// Just holds state for now ...
savet7App.factory('userService', function($http, $uibModal, $log, $location) {

	var userServiceState = {
		loggedIn : false,
		user : null,
	}

	return {
		isLoggedIn : function() {
			return userServiceState.loggedIn;
		},
		getUser : function() {
			return userServiceState.user;
		},

		setLoggedIn : function(isLoggedIn) {
			userServiceState.loggedIn = isLoggedIn;
		},
		setUser : function(user) {
			userServiceState.user = user;
		}
	}
});