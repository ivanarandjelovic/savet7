var $ = require('jquery');

var buildingActions = {

  setbuildings: (buildings) => {
    return  {
      type: 'BUILDINGS_SET',
      buildings: buildings
    };
  },

  getBuildings: () => {
    console.log($.get);
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
  }

};

module.exports = buildingActions;
