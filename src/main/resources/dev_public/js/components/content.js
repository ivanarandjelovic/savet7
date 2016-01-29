var React = require('react');
//var RouteHandler = require('react-router').RouteHandler;

var Content = React.createClass({
  render: function() {

    return (
      <div className="container">
        {/* Render the child route component */}
        {this.props.children}
      </div>
    );
  }
});

module.exports = Content;



