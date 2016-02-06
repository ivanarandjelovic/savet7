var React = require('react');
import Link from 'react-router/lib/Link';
import {
  connect
} from 'react-redux'
var translate = require('counterpart');
var buildingActions = require('../actions/buildingActions');

var BuildingList = React.createClass({

  _refreshDataIfNeeded: function() {
    if(this.state.loggedIn) {
      this.props.dispatch(buildingActions.getBuildings());
    }
  },

  getInitialState: function() {
    return {loggedIn : this.props.loginData.loggedIn};
  },

  componentWillMount: function() {
      this._refreshDataIfNeeded();
  },

  componentWillReceiveProps: function (newProps) {
    if(this.state.loggedIn != newProps.loginData.loggedIn) {
      this.setState({loggedIn : newProps.loginData.loggedIn});
      this._refreshDataIfNeeded();
    }
  },

  render: function() {
    var buildings = undefined;
    if(this.props.data.buildings !== undefined) {
      var buildings = this.props.data.buildings._embedded.buildings;
    }

    if(!this.props.loginData.loggedIn) {
      return <span>{translate('APP_NOT_LOGGED_IN')}</span>;
    } else if (buildings === undefined || buildings.length === 0) {
      return <span>Empty building list</span>;
    } else {
    return (
      <table className="table table-striped">
        {
          buildings.map(function(building) {
            return (
              <tr>
                <td>
                  <Link to={`buildingDetails/${building.id}`}>
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
