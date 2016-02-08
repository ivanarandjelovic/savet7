describe('buildingActions', function() {

  var buildingActions;
  var buildings;

  beforeEach(function() {
    buildingActions = require.requireActual('../../main/resources/dev_public/js/actions/buildingActions');
    buildings = require.requireActual("./buildings.json");

  });

  it('should return action when setting some buildings', function() {
    expect(buildingActions.setbuildings(buildings)).toEqual({
      type: 'BUILDINGS_SET',
      buildings: buildings
    });
  });

  it('should return function when asking to get buildings', function() {
    var action = buildingActions.getBuildings();
    expect(typeof action).toBe('function');
    var dispatch = jest.genMockFunction();
    action(dispatch);

    var $ = require('jquery');
    expect($.get.mock.calls.length).toEqual(1);
    expect($.get).toBeCalledWith({
       url: 'http://localhost:8080/api/buildings',
       xhrFields: {
         withCredentials: true
       }
     }, jasmine.any(Function));
     // Simulate return data from api call:
     $.get.mock.calls[0 /*first call*/][1 /*first argument*/](buildings);
     expect(dispatch).toBeCalledWith({
       type: 'BUILDINGS_SET',
       buildings: buildings
     });
  });

});
