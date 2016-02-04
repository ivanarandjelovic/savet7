
var buildingActions = {

  setbuildings: (buildings) => {
    return  {
      type: 'BUILDINGS_SET',
      buildings: buildings
    };
  },

  getBuildings: () => {
    return dispatch => {
      $.get('http://localhost:8080/api/buildings', (data) => {
        // Login success
        dispatch(buildingActions.setbuildings(data));
      });
    }
  }

};

module.exports = buildingActions;
