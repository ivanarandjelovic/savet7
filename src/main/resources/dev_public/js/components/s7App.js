var React = require('react');
var NavBar = require('./navBar');
var Content = require('./content');

var S7App = React.createClass({
  render: function() {

    return (
    <div>
      <NavBar />
      <Content/>
    </div>
    );
  }
});

module.exports = S7App;



