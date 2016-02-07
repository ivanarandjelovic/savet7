var React = require('react');
var NavBar = require('./navBar.jsx');
var Content = require('./content.jsx');
import ToastrManager from './toastrManager.jsx'
var loginActions = require('../actions/loginActions');
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import PubSubJs from 'pubsub-js'

var S7App = React.createClass({

  pubsubTokenLogout: null,

  getInitialState: () => {
    return {currentLangCd : undefined};
  },

  componentWillMount : function() {
    this.setState( {currentLangCd: this.props.appData.langCd});
    // refresh current user:
    this.props.dispatch(loginActions.fetchUser());
    this.pubsubTokenLogout = PubSubJs.subscribe('LOGOUT', function(msg, data) {
      this.logout();
    }.bind(this));
  },

  componentWillReceiveProps: function(newProps) {
    // Setting the state will trigger render if the language is changed
    if( (this.state.currentLangCd === undefined && this.props.appData.langCd != undefined )
      || (this.state.currentLangCd !== this.props.appData.langCd) ) {
      this.setState({currentLangCd: this.props.appData.langCd});
    }
  },

  logout: function() {
    browserHistory.replace("/");
  },

  render: function() {

    return (
      <div>
        <ToastrManager />
        <NavBar {...this.props}/>
        <Content children={this.props.children}/>
      </div>
    );
  }
});

export default connect(state => { return { appData: state.appData, loginData: state.loginData};} )(S7App);
