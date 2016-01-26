describe("AddressCtrl test", function() {

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

	beforeEach(function() {
		module('savet7App');
	});

	beforeEach(function() {
		module('/partials/building-list.html');
	});

	var $controller, $timeout, $httpBackend, $translate, $rootScope, $location;

	var addresCtrl, addresScope, getServiceHandler, postServiceHandler, putServiceHandler, patchServiceHandler;

	beforeEach(inject(function(_$controller_, _$timeout_, _$httpBackend_, _$translate_, _$rootScope_, _$location_) {
		// The injector unwraps the underscores (_) from around the parameter names
		// when matching
		$controller = _$controller_;
		$timeout = _$timeout_;
		$httpBackend = _$httpBackend_;
		$translate = _$translate_;
		$rootScope = _$rootScope_;
		$location = _$location_;

		$httpBackend.when('GET', '/translations/en.json').respond(function() {
			return [ 200, en_json, {} ];
		});
		$httpBackend.when('GET', '/translations/rs.json').respond(function() {
			return [ 200, rs_json, {} ];
		});

		getServiceHandler = $httpBackend.when('GET', '/api/addresses/2').respond(function() {
			return [ 200, address_json, {} ];
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

	describe('Adding new address', function() {

		beforeEach(function() {
			addresScope = $rootScope.$new();
			addresScope.addressForm = {};
			addresScope.addressForm.testField = {};

			addresCtrl = $controller('editAddressCtrl', {
				$scope : addresScope,
				$routeParams : {
					buildingId : 1
				}
			});
			$httpBackend.flush();
		});

		it('initial state', function() {
			expect(addresScope.adding).toBeTruthy();
			expect(addresScope.buildingId).toBe(1);
			expect(addresScope.address).toEqual({});
		});

		it('cancel scrren', function() {
			addresScope.cancel();
			expect($location.path()).toBe("/buildings/" + addresScope.buildingId);
		});

		it('error showing', function() {

			addresScope.addressForm.testField.$invalid = true;
			addresScope.addressForm.testField.$touched = true;
			addresScope.submitted = false;
			expect(addresScope.showError('testField')).toBeTruthy();

			addresScope.addressForm.testField.$invalid = true;
			addresScope.addressForm.testField.$touched = false;
			addresScope.submitted = false;
			expect(addresScope.showError('testField')).toBeFalsy();

			addresScope.addressForm.testField.$invalid = false;
			addresScope.addressForm.testField.$touched = false;
			addresScope.submitted = false;
			expect(addresScope.showError('testField')).toBeFalsy();

			addresScope.addressForm.testField.$invalid = true;
			addresScope.addressForm.testField.$touched = false;
			addresScope.submitted = true;
			expect(addresScope.showError('testField')).toBeTruthy();

			addresScope.addressForm.testField.$invalid = false;
			addresScope.addressForm.testField.$touched = true;
			addresScope.submitted = true;
			expect(addresScope.showError('testField')).toBeFalsy();

			addresScope.addressForm.testField.$invalid = false;
			addresScope.addressForm.testField.$touched = false;
			addresScope.submitted = true;
			expect(addresScope.showError('testField')).toBeFalsy();
		});

		it('add address - success', function() {
			addresScope.addressForm.$valid = true;
			addresScope.submit();
			$httpBackend.flush();
			expect($location.path()).toBe("/buildings/" + addresScope.buildingId);
			expect(addresScope.showFormError).toBeFalsy();
		});

		it('add address - error', function() {
			addresScope.addressForm.$valid = true;
			postServiceHandler.respond(500);
			addresScope.submit();
			$httpBackend.flush();
			expect($location.path()).not.toBe("/buildings/" + addresScope.buildingId);
			expect(addresScope.showFormError).toBeFalsy();
			expect(toastr.warning).toHaveBeenCalledWith('Address creation failed!?');
		});

		it('add address - sucess  - building update error', function() {
			addresScope.addressForm.$valid = true;
			putServiceHandler.respond(500);
			addresScope.submit();
			$httpBackend.flush();
			expect($location.path()).not.toBe("/buildings/" + addresScope.buildingId);
			expect(addresScope.showFormError).toBeFalsy();
			expect(toastr.warning).toHaveBeenCalledWith('Building updated failed!?');
		});

		it('add address - form has errors', function() {
			addresScope.addressForm.$valid = false;
			addresScope.submit();
			expect($location.path()).not.toBe("/buildings/" + addresScope.buildingId);
			expect(addresScope.showFormError).toBeTruthy();
		});

	});

	describe('Editing existing address', function() {

		beforeEach(function() {
			addresScope = $rootScope.$new();
			addresScope.addressForm = {};
			addresScope.addressForm.testField = {};

			addresCtrl = $controller('editAddressCtrl', {
				$scope : addresScope,
				$routeParams : {
					buildingId : 1,
					addressId : 2
				}
			});
			$httpBackend.flush();
		});

		it('initial state', function() {
			expect(addresScope.adding).toBeFalsy();
			expect(addresScope.buildingId).toBe(1);
			expect(addresScope.address.id).toBe(2);
		});

		it('cancel scrren', function() {
			addresScope.cancel();
			expect($location.path()).toBe("/buildings/" + addresScope.buildingId);
		});

		it('edit address - success', function() {
			addresScope.addressForm.$valid = true;
			addresScope.submit();
			$httpBackend.flush();
			expect($location.path()).toBe("/buildings/" + addresScope.buildingId);
			expect(addresScope.showFormError).toBeFalsy();
		});

		it('edit address - error', function() {
			addresScope.addressForm.$valid = true;
			patchServiceHandler.respond(500);
			addresScope.submit();
			$httpBackend.flush();
			expect($location.path()).not.toBe("/buildings/" + addresScope.buildingId);
			expect(addresScope.showFormError).toBeFalsy();
			expect(toastr.warning).toHaveBeenCalledWith('Update failed!?');
		});

	});

});
