describe("UserService test", function() {

  var userServiceObj;
  var user = { username : "test" };
  var nullUser = { username : null };

  beforeEach(function() {
    module('savet7App');
  });

  beforeEach(inject(function(userService) {
    userServiceObj = userService;
  }));

  it('should initially not be logged in and user should be null', function() {
    expect(userServiceObj.isLoggedIn()).toBeFalsy();
    expect(userServiceObj.getUser()).toBeNull();
  });

  it('should report user after setting it', function() {
    userServiceObj.setUser(user);
    expect(userServiceObj.getUser()).toEqual(user);
  });

  it('should report as logged in after setting user and as logged out afterwards', function() {
    userServiceObj.setUser(user);
    expect(userServiceObj.isLoggedIn()).toBeTruthy();
    userServiceObj.setUser(nullUser);
    expect(userServiceObj.isLoggedIn()).toBeFalsy();
  });
  
  it('should report as logged in after setting null as a user', function() {
    userServiceObj.setUser(user);
    expect(userServiceObj.isLoggedIn()).toBeTruthy();
    userServiceObj.setUser(null);
    expect(userServiceObj.isLoggedIn()).toBeFalsy();
  });

});
