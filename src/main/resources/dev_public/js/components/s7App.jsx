var React = require('react');
var NavBar = require('./navBar.jsx');
var Content = require('./content.jsx');
var loginActions = require('../actions/loginActions');
import {
  connect
} from 'react-redux'

var S7App = React.createClass({

  componentWillMount : function() {
    this.props.dispatch(loginActions.fetchUser());
  },

  render: function() {

    return (
      <div>
        <NavBar {...this.props}/>
        <Content {...this.props}/>
      </div>
    );
  }
});

export default connect(state => state)(S7App);
