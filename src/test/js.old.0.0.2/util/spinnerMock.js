var spinnerMock = function(spinnerName) {
  var state = {
    visible : false
  };

  var _showHide = function(show) {
    state.visible = show;
  }

  return {
    name : spinnerName,
    hide : function() {
      _showHide(false)
    },
    show : function() {
      _showHide(true)
    },
    getState : function() {
      return _.clone(state);
    }
  }
}