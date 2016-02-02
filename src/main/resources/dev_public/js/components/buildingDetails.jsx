var React = require('react');
import {
  connect
} from 'react-redux'

var BuildingDetails = React.createClass({
  render: function() {

    return (
      <div>
        BuildingDetails
      </div >
    );
  }
});

//module.exports = BuildingDetails;

export default connect(state => state)(BuildingDetails);
