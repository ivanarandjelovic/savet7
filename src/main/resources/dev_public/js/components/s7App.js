var React = require('react');
var NavBar = require('./navBar');
var Content = require('./content');

var S7App = React.createClass({
  render: function() {

    return (
    <div>
      <NavBar />
      <Content children={this.props.children}/>
    </div>
    );
  }
});

module.exports = S7App;



