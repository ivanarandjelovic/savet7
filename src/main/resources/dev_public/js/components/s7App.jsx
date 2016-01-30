var React = require('react');
var NavBar = require('./navBar.jsx');
var Content = require('./content.jsx');
import {
  connect
} from 'react-redux'

var S7App = React.createClass({
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
