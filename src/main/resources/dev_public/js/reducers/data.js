var data = function(state = {}, action) {

  if (action.type === 'BUILDINGS_SET') {
      state = { buildings: action.buildings};
  }

  return state;
}

module.exports = data;
