describe("BuidlingListCtrl test", function() {

	var en_json = {
		"TEXT" : "english"
	};
	var rs_json = {
		"TEXT" : "serbian"
	};

	var address_json = {
		id : 2,
		street : "test_street",
		number : "test_number",
		_links : {
			self : {
				href : "test_href"
			}
		}
	};
	
  var user = { username : "test" };
  
  	beforeEach(function() {
		module('savet7App');
	});

	beforeEach(function() {
		module('/partials/building-list.html');
	});

	var scope,controller, $controller, $timeout, $httpBackend, $translate, $rootScope, $location, userServiceObj;

	var getServiceHandler, postServiceHandler, putServiceHandler, patchServiceHandler;

	beforeEach(inject(function(_$controller_, _$timeout_, _$httpBackend_, _$translate_, _$rootScope_, _$location_, userService) {
		// The injector unwraps the underscores (_) from around the parameter names
		// when matching
		$controller = _$controller_;
		$timeout = _$timeout_;
		$httpBackend = _$httpBackend_;
		$translate = _$translate_;
		$rootScope = _$rootScope_;
		$location = _$location_;
		userServiceObj = userService;

		$httpBackend.when('GET', '/translations/en.json').respond(function() {
			return [ 200, en_json, {} ];
		});
		$httpBackend.when('GET', '/translations/rs.json').respond(function() {
			return [ 200, rs_json, {} ];
		});

		getServiceHandler = $httpBackend.when('GET', '/api/buildings?page=0').respond(function() {
			return [ 200, buildingsJSON, {} ];
		});
		postServiceHandler = $httpBackend.when('POST', '/api/addresses/').respond(function() {
			return [ 200, address_json, {} ];
		});
		patchServiceHandler = $httpBackend.when('PATCH', '/api/addresses/2').respond(function() {
			return [ 200, address_json, {} ];
		});
		putServiceHandler = $httpBackend.when('PUT', '/api/buildings/1/address').respond(function() {
			return [ 200, {}, {} ];
		});
		
		spyOn(toastr,'warning');
		
	}));

	describe('List buildings', function() {
		beforeEach(function() {
			scope = $rootScope.$new();
			
			controller = $controller('buildingListCtrl', {
				$scope : scope
			});
			$httpBackend.flush();
		});

		it('initial state', function() {
			expect(scope.loggedIn).toBeFalsy();
			expect(scope.buildings).toBeUndefined();
		});

    it('logged in load buildings', function() {
      userServiceObj.setUser(user);
      scope.$apply();
      expect(scope.loggedIn).toBeTruthy();
      getServiceHandler.respond(401);
      scope.loadBuildings();
      $httpBackend.flush();
      expect(scope.buildings).toBeUndefined();
    });
    
    it('logged in load buildings but error response', function() {
      userServiceObj.setUser(user);
      scope.$apply();
      expect(scope.loggedIn).toBeTruthy();
      scope.loadBuildings();
      $httpBackend.flush();
      expect(scope.buildings).toEqual(buildingsJSON._embedded.buildings);
    });
    
    it('go to adding new building', function() {
      scope.addBuilding();
      expect($location.path()).toBe("/addBuilding/");
    });
    
    it('should change page and load new buildings', function() {
      userServiceObj.setUser(user);
      scope.$apply();
      expect(scope.loggedIn).toBeTruthy();
      
      scope.currentPage = 2;
      getServiceHandler = $httpBackend.expectGET('/api/buildings?page=1').respond(function() {
        return [ 200, buildingsJSON, {} ];
      });
      scope.pageChanged();
      $httpBackend.flush();
      expect(scope.buildings).toEqual(buildingsJSON._embedded.buildings);
    });
    
	});
});
