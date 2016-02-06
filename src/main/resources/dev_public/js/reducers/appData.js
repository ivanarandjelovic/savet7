var appData = function(state = { langCd: undefined }, action) {

  if (action.type === 'APP_ACTION_LANGUAGE') {
    state = { langCd: action.langCd};
  }

  return state;
}

module.exports = appData;
