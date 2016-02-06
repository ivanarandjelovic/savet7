var React = require('react');
var toastr = require('toastr');
var loginActions = require('../actions/loginActions');
var translate = require('counterpart');
import { connect } from 'react-redux'

var ToastrManager = React.createClass({

  componentWillMount: () => {
    toastr.options.closeButton = true;
    toastr.options.positionClass = "toast-top-center";
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.loginData.loginFailed) {
      toastr.error(translate('APP_LOGIN_BAD'));
      this.props.dispatch(loginActions.clearLoginData());
    }
    if (nextProps.loginData.loginSuccess) {
      toastr.success(translate('APP_LOGIN_SUCCESS'));
      this.props.dispatch(loginActions.clearLoginData());
    }
    if (nextProps.loginData.logoutSuccess) {
      toastr.warning(translate('APP_LOGOUT_SUCCESS'));
      this.props.dispatch(loginActions.clearLoginData());
    }

  },

  render: function() {
    return (
      <div></div>
    );
  }
});

//module.exports = ToastrManager;
export default connect(function(state) { return {loginData: state.loginData}; } )(ToastrManager);
