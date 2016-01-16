describe('Unit testing s7Building directive', function() {
  var $compile, $rootScope;
  var addressWithState = {
      street : "street",
      number : "number",
      appartment : "appartment",
      postalCode : "postalCode",
      city : "city",
      state : "state",
      country : "country"
    };

    var addressNoState = {
        street : "street",
        number : "number",
        appartment : "appartment",
        postalCode : "postalCode",
        city : "city",
        country : "country"
      };

  // Load the myApp module, which contains the directive
  //beforeEach(module('savet7templates'));
  beforeEach(module('savet7App'));
  beforeEach(module('/partials/s7Address.html'));
  
  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend) {
    // The injector unwraps the underscores (_) from around the parameter names
    // when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    
    $httpBackend.when('GET', '/translations/en.json').respond('');
  }));

  it('Replaces the element with the appropriate content (and state)', function() {
    // Compile a piece of HTML containing the directive
    $rootScope.address = addressWithState;
    var element = $compile("<s7-address address='address' />")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("street number appartment");
    expect(element.html()).toContain("postalCode city");
    expect(element.html()).toContain("state");
    expect(element.html()).toContain("country");

  });
  
  it('Replaces the element with the appropriate content (but no state)', function() {
    // Compile a piece of HTML containing the directive
    $rootScope.address = addressNoState;
    var element = $compile("<s7-address address='address' />")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("street number appartment");
    expect(element.html()).toContain("postalCode city");
    expect(element.html()).not.toContain("state</div>");
    expect(element.html()).toContain("country");

  });
  
});