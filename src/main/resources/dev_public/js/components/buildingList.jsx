var React = require('react');
import Link from 'react-router/lib/Link';
import {
  connect
} from 'react-redux'

var BuildingList = React.createClass({
  render: function() {

    if(!this.props.loginData.loggedIn) {
      return <span>Not logged in!</span>;
    } else if (this.props.buildings === undefined || this.props.buildings.length === 0) {
      return <span>Empty building list</span>;
    } else {
    return (
      <table className="table table-striped">
        {
          this.props.buildings.map(function(building) {
            return (
              <tr>
                <td>
                  <Link to="buildingDetails/{building.id}">
                    <span>
                      {building.name}
                    </span>
                  </Link>
                </td>
                <td>
                  Address here
                </td>
              </tr>
            );
          })
        }
      </table>
    );
    }
  }
});

//module.exports = BuildingList;

export default connect(state => state)(BuildingList);
