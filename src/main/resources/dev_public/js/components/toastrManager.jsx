var React = require('react');
var toastr = require('toastr');
var loginActions = require('../actions/loginActions');

var ToastrManager = React.createClass({

  componentWillMount: () => {
    toastr.options.closeButton = true;
    toastr.options.positionClass = "toast-top-center";
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.loginData.loginFailed) {
      toastr.error("Invalid login!");
      this.props.dispatch(loginActions.clearLoginData());
    }
    if (nextProps.loginData.loginSuccess) {
      toastr.success("Login successfull.");
      this.props.dispatch(loginActions.clearLoginData());
    }
    if (nextProps.loginData.logoutSuccess) {
      toastr.warning("Logout successfull.");
      this.props.dispatch(loginActions.clearLoginData());
    }

  },

  render: function() {
    return (
      <div></div>
    );
  }
});

module.exports = ToastrManager;
