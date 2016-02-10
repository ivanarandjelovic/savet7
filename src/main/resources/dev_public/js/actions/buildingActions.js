var $ = require('jquery');

var buildingActions = {


  getBuildings: () => {
    return dispatch => {
      $.get({
        url: 'http://localhost:8080/api/buildings',
        xhrFields: {
          withCredentials: true
        }
      }, (data) => {
        // Login success
        dispatch(buildingActions.setbuildings(data));
      });
    }
  },

  setbuildings: (buildings) => {
    return {
      type: 'BUILDINGS_SET',
      buildings: buildings
    };
  },

  getBuilding: (buildingId) => {
    return dispatch => {
      $.get({
        url: 'http://localhost:8080/api/buildings/' + buildingId + '?projection=inlineAddress',
        xhrFields: {
          withCredentials: true
        }
      }, (data) => {
        // Login success
        dispatch(buildingActions.setbuilding(data));
      });
    }
  },

  setbuilding: (building) => {
    return {
      type: 'BUILDING_SET',
      building: building
    };
  }

};

module.exports = buildingActions;
