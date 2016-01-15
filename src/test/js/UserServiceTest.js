describe("UserService test", function() {

    var userServiceObj;

    beforeEach(function() {
        module('savet7App');
    });

    beforeEach(inject(function(userService) {
        userServiceObj = userService;
    }));

    it('should initially not be logged in and user should be null', function() {
        expect(userServiceObj.isLoggedIn()).toEqual(false);
        expect(userServiceObj.getUser()).toEqual(null);
    });

});
