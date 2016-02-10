var data = function(state = {}, action) {

  if (action.type === 'BUILDINGS_SET') {
    state = Object.assign({}, state, {
      buildings: action.buildings
    });
  }
  if (action.type === 'BUILDING_SET') {
    state = Object.assign({}, state, {
      building: action.building
    });
  }

  return state;
}

module.exports = data;
