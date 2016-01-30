var React = require('react');
var NavBar = require('./navBar');
var Content = require('./content');
import {
  connect
} from 'react-redux'

var S7App = React.createClass({
  render: function() {

    return (
      <div>
        <NavBar loginData={this.props.loginData}/>
        <Content {...this.props}/>
      </div>
    );
  }
});

export default connect(state => state)(S7App);
