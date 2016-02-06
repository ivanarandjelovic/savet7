var React = require('react');
import {
  connect
} from 'react-redux'

var Address = React.createClass({
  render: function() {
    var address = this.props.address;
    return (
      <div>
      	<div>{address.street} {address.number} {address.appartment}</div>
      	<div>{address.postalCode} {address.city}</div>
      	{address.state ? <div>{address.state}</div> : ''}
      	<div>{address.country}</div>
      </div>
    );
  }
});

module.exports = Address;

//export default connect(state => state)(BuildingDetails);
