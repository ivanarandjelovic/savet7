describe('buildingActions', function() {

  var buildingActions;
  var buildings;
  var $;

  beforeEach(function() {
  //  jest.mock('jquery');
    jest.dontMock('../../main/resources/dev_public/js/actions/buildingActions');
    this.buildingActions = require('../../main/resources/dev_public/js/actions/buildingActions');

    jest.dontMock('./buildings.json');
    this.buildings = require("./buildings.json");

  });

  it('should return action when setting some buildings', function() {
    expect(this.buildingActions.setbuildings(this.buildings)).toEqual({
      type: 'BUILDINGS_SET',
      buildings: this.buildings
    });
  });

  it('should return function when asking to get buildings', function() {
    var action = this.buildingActions.getBuildings();
    expect(typeof action).toBe('function');
    var dispatch = jest.genMockFunction();
    action(dispatch);
  //console.log(this.$);
  //  expect($.get.mock.calls.length).toEqual(1);
  //$.get();
  //console.log(this.$.get);
    // var $ = require('jquery');
    // expect(this.$.get).toBeCalledWith({
    //     url: 'http://localhost:8080/api/buildings',
    //     xhrFields: {
    //       withCredentials: true
    //     }
    //   }, jasmine.any(Function));
    // $.get.mock.calls[0 /*first call*/][0 /*first argument*/].success({
    //   firstName: 'Bobby',
    //   lastName: '");DROP TABLE Users;--'
    // });
  });

});
