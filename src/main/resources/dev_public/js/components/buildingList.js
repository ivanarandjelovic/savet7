var React = require('react');
import Link from 'react-router/lib/Link';

var BuildingList = React.createClass({
  render: function() {

    if(this.props.buildings === undefined) {
      return <span>Not logged in!</span>;
    } else if (this.props.buildings.length === 0) {
      return <span>Empty list</span>;
    } else {
    return (
        <table className="table table-striped">
        {
          this.props.buildings.map(function(building) {
            return (<tr><td><Link to="buildingDetails/{building.id}"><span>{building.name}</span></Link></td><td>Address here</td></tr>);
          })
        }
      </table> 
    );
    }
  }
});

module.exports = BuildingList;



