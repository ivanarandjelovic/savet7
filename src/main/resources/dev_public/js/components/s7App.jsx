var React = require('react');
var NavBar = require('./navBar.jsx');
var Content = require('./content.jsx');
var ToastrManager = require('./toastrManager.jsx')
var loginActions = require('../actions/loginActions');
import {
  connect
} from 'react-redux'

var S7App = React.createClass({

  getInitialState: () => {
    return {currentLangCd : undefined};
  },

  componentWillMount : function() {
    this.setState( {currentLangCd: this.props.appData.langCd});
    //this.props.dispatch(loginActions.fetchUser());
  	//this.props.dispatch(loginActions.login("user","user"));
  },

  componentWillReceiveProps: function(newProps) {
    if(this.state.currentLangCd !== this.props.appData.langCd) {
      this.setState({currentLangCd: this.props.appData.langCd});
    }
  },

  render: function() {

    return (
      <div>
        <ToastrManager {...this.props}/>
        <NavBar {...this.props}/>
        <Content {...this.props}/>
      </div>
    );
  }
});

export default connect(state => state)(S7App);
