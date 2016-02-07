var React = require('react');
var toastr = require('toastr');
var loginActions = require('../actions/loginActions');
var translate = require('counterpart');
import {connect} from 'react-redux'
import PubSubJs from 'pubsub-js'

var ToastrManager = React.createClass({

  pubsubTokenLogin: null,
  pubsubTokenLogout: null,
  pubsubTokenLoginError: null,

  componentWillMount: function() {
    this.pubsubTokenLogin = PubSubJs.subscribe('LOGIN', function(msg, data) {
      this.login();
    }.bind(this));
    this.pubsubTokenLogout = PubSubJs.subscribe('LOGOUT', function(msg, data) {
      this.logout();
    }.bind(this));
    this.pubsubTokenLoginError = PubSubJs.subscribe('LOGIN_ERROR', function(msg, data) {
      this.loginError();
    }.bind(this));

    toastr.options.closeButton = true;
    toastr.options.positionClass = "toast-top-center";
  },

  compoentWillUnmount: function() {
    PubSubJs.unsubscribe(this.pubsubTokenLogin);
    PubSubJs.unsubscribe(this.pubsubTokenLogout);
    PubSubJs.unsubscribe(this.pubsubTokenLoginError);
  },

  loginError: function() {
    toastr.error(translate('APP_LOGIN_BAD'));
  },
  login: function() {
    toastr.success(translate('APP_LOGIN_SUCCESS'));
  },
  logout: function() {
    toastr.warning(translate('APP_LOGOUT_SUCCESS'));
  },

  render: function() {
    return (
      <div></div>
    );
  }
});

module.exports = ToastrManager;
// export default connect(function(state) {
//   return {loginData: state.loginData};
// })(ToastrManager);
